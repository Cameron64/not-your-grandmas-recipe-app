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

        //get recipes call
        public async Task<List<Recipe>> GetRecipesAsync()
        {
            try
            {
                var recipes = new List<Recipe>();
                var iterator = _container.GetItemQueryIterator<Recipe>();
                while (iterator.HasMoreResults)
                {
                    var response = await iterator.ReadNextAsync();
                    recipes.AddRange(response.ToList());
                }
                return recipes;
            }
            catch (Exception ex)
            {
                // Handle the exception here
                Console.WriteLine($"An error occurred while getting recipes: {ex.Message}");
                return new List<Recipe>();
            }
        }

        //edit
        public async Task UpdateRecipeAsync(Recipe recipe)
        {
            await _container.UpsertItemAsync(recipe, new PartitionKey(recipe.RecipeId));
        }

        //delete
        public async Task DeleteRecipeAsync(string id, string recipeId)
        {
            try
            {
                await _container.DeleteItemAsync<Recipe>(id, new PartitionKey(recipeId));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while deleting the recipe: {ex.Message}");
                throw ex;
            }
        }
    }

}
