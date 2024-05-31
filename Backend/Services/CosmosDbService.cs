 using Azure;
    using Azure.AI.FormRecognizer.DocumentAnalysis;
using Backend.Models;
using Microsoft.Azure.Cosmos;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class CosmosDbService
    {
        private readonly CosmosClient _cosmosClient;
        private readonly Database _database;
        private readonly Container _container;

        public CosmosDbService(IConfiguration configuration)
        {
            _cosmosClient = new CosmosClient(configuration["CosmosDb:EndpointUri"], configuration["CosmosDb:PrimaryKey"]);
            _database = _cosmosClient.GetDatabase(configuration["CosmosDb:DatabaseId"]);
            _container = _database.GetContainer(configuration["CosmosDb:ContainerId"]);
        }

        public async Task AddRecipeAsync(Recipe recipe)
        {
            await _container.CreateItemAsync(recipe, new PartitionKey(recipe.RecipeId));
        }

        // Additional CRUD operations can be added here.
    }

}
