using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using System.IO;
using System.Threading.Tasks;

public class ImageProcessingService
{
    private readonly string _endpoint;
    private readonly string _key;
    private readonly ComputerVisionClient _client;

    public ImageProcessingService(IConfiguration configuration)
    {
        _endpoint = configuration["AzureCognitiveServices:ComputerVision:Endpoint"];
        _key = configuration["AzureCognitiveServices:ComputerVision:Key"];
        _client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_key))
        {
            Endpoint = _endpoint
        };
    }

    public async Task<OcrResult> ExtractTextFromImageAsync(Stream imageStream)
    {
        return await _client.RecognizePrintedTextInStreamAsync(true, imageStream);
    }
}
