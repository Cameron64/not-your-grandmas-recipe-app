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

    public RecipeController(FormRecognizerService formRecognizerService)
    {
        _formRecognizerService = formRecognizerService;
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

        // Reset the position to the beginning of the stream
        memoryStream.Position = 0;

        var result = await _formRecognizerService.AnalyzeDocumentAsync(memoryStream);


        return new JsonResult(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetRecipes()
    {
        var recipes = new List<Recipe>();
        return new JsonResult(recipes);
    }


}
