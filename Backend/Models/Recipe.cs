using Newtonsoft.Json;

namespace Backend.Models
{
    public class Recipe
    {
        public Recipe()
        {
            Ingredients = new List<string>();
            Steps = new List<string>();
        }
        [JsonProperty("recipeId")]
        public string RecipeId { get; set; }
        public string id { get; set; }
        public string ?Name { get; set; }
        public List<string> Ingredients { get; set; }
        public List<string> ?Steps { get; set; }
    }
}
