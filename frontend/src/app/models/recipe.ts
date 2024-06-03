export class Recipe {
    constructor(
      public recipeId: string,
      public id: string,
      public name: string | null,
      public ingredients: string[],
      public steps: string[] | null
    ) {}
  }
  