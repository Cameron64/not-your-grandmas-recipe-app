namespace Backend.Models
{
    public class Recipe
    {
        public Recipe()
        {
            // Initialize lists to avoid null reference exceptions
            Ingredients = new List<string>();
            Steps = new List<string>();
        }
            
        public int Id { get; set; }
        public string ?Name { get; set; }
        public List<string> Ingredients { get; set; }
        public string ?Instructions { get; set; }
        public string ?ImageUrl { get; set; }
        public List<string> ?Steps { get; set; }

    }
}
