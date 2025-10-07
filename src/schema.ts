import { s } from "@hashbrownai/core";

export const recipeSchema = s.object("a recipe", {
  title: s.string("the title of the recipe"),
  ingredients: s.array("a list of ingredients", s.string("an ingredient")),
  instructions: s.array("a list of instructions", s.string("an instruction")),
});
