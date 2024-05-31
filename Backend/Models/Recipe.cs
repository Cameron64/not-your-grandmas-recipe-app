namespace Backend.Models
{
    public class Recipe
    {
        public Recipe()
        {
            Ingredients = new List<string>();
            Steps = new List<string>();
        }
            
        public int Id { get; set; }
        public string ?Name { get; set; }
        public List<string> Ingredients { get; set; }
        public List<string> ?Steps { get; set; }
    }
}
