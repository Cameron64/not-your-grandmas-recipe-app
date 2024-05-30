 using Azure;
    using Azure.AI.FormRecognizer.DocumentAnalysis;
    using Microsoft.Extensions.Configuration;
    using System;
    using System.IO;
    using System.Threading.Tasks;

namespace Backend.Services
{
    public class FormRecognizerService
    {
        private readonly DocumentAnalysisClient _client;

        public FormRecognizerService(IConfiguration configuration)
        {
            var endpoint = configuration["AzureFormRecognizer:Endpoint"];
            var apiKey = configuration["AzureFormRecognizer:ApiKey"];
            var credential = new AzureKeyCredential(apiKey);
            _client = new DocumentAnalysisClient(new Uri(endpoint), credential);
        }

        public async Task<AnalyzeResult> AnalyzeDocumentAsync(Stream documentStream)
        {
            var result = await _client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-receipt", documentStream);
            return result.Value;
        }
    }


}
