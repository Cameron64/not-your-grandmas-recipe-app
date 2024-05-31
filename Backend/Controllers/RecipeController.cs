using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly FormRecognizerService _formRecognizerService;
    private readonly OpenAIService _openAIService;


    public RecipeController(FormRecognizerService formRecognizerService, OpenAIService openAIService)
    {
        _formRecognizerService = formRecognizerService;
        _openAIService = openAIService;
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

        var chatGptResponse = await QueryLLM(result.Content);

        return new JsonResult(chatGptResponse);
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
                public int Id {{ get; set; }}
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
