using Backend.Models;

namespace Backend.Utils
{
    public class RecipeParser
    {
        public Recipe ParseRecipe(string extractedText)
        {
            var lines = extractedText.Split(new[] { Environment.NewLine }, StringSplitOptions.None);
            var recipe = new Recipe();
            bool isIngredientsSection = true;

            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    isIngredientsSection = false;
                    continue;
                }

                if (isIngredientsSection)
                {
                    recipe.Ingredients.Add(line);
                }
                else
                {
                    recipe.Steps.Add(line);
                }
            }

            return recipe;
        }
    }

}


