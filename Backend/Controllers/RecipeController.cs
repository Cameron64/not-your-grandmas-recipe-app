using Backend.Models;
using Backend.Services;
using Backend.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly FormRecognizerService _formRecognizerService;
    private readonly OpenAIService _openAIService;
    private readonly CosmosDbService _cosmosDbService;


    public RecipeController(FormRecognizerService formRecognizerService, OpenAIService openAIService, CosmosDbService cosmosDbService)
    {
        _formRecognizerService = formRecognizerService;
        _openAIService = openAIService;
        _cosmosDbService = cosmosDbService;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadRecipeImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("The uploaded file is empty.");
        }

        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        memoryStream.Position = 0;

        var result = await _formRecognizerService.AnalyzeDocumentAsync(memoryStream);

        var recipeObj = await QueryLLM(result.Content);

        //check if recipeObj is valid
        if(recipeObj == null)
        {
            return BadRequest("Recipe could not be generated.");
        }
        else
        {
            Recipe recipe = JsonConverter.ConvertJsonToObject<Recipe>(recipeObj);
            recipe.id = Guid.NewGuid().ToString();
            recipe.RecipeId = Guid.NewGuid().ToString();
            await _cosmosDbService.AddRecipeAsync(recipe);
        }

        return new JsonResult(recipeObj);
    }

    [HttpGet]
    public async Task<IActionResult> GetRecipes()
    {
        var recipes = new List<Recipe>();
        return new JsonResult(recipes);
    }

    private async Task<string> QueryLLM([FromBody] string prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
        {
            throw new ArgumentException("Prompt cannot be empty.", nameof(prompt));
        }
        //multiline string with interpolation

        string promptPretext = $@"
            The following is a recipe. It may contain mistakes or be out of order, but it should contain ingredients and instructions.
            Please make corrections as needed and return the recipe as a json object adhering to the following model:
                public string RecipeId {{ get; set; }}
                public string ?Name {{ get; set; }}
                public List<string> Ingredients {{ get; set; }}
                public List<string> ?Steps {{ get; set; }}
            Here is the recipe:
                {prompt}
        ";

        var response = await _openAIService.QueryLLMAsync(promptPretext);
        return response;
    }



}
