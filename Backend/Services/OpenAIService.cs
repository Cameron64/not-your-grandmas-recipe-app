using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class OpenAIService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public OpenAIService(IConfiguration configuration)
        {
            _httpClient = new HttpClient();
            _apiKey = configuration["OpenAI:ApiKey"];
        }

        public async Task<string> QueryLLMAsync(string prompt)
        {

            int inputTokens = EstimateTokens(prompt);

            var requestContent = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
           {
                new { role = "user", content = prompt }
            },
                max_tokens = 4096 - inputTokens
            };

            var jsonContent = new StringContent(JsonSerializer.Serialize(requestContent), Encoding.UTF8, "application/json");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", jsonContent);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);

            var a = jsonResponse.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

            return a;
        }

        private int EstimateTokens(string text)
        {
            // A rough estimation function for token count
            return text.Split(new[] { ' ', '\n' }, StringSplitOptions.RemoveEmptyEntries).Length;
        }
    }

}
