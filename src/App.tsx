// import { exposeComponent, useUiChat } from "@hashbrownai/react";
//import { useChat } from "@hashbrownai/react";
import "./App.css";
import { RouletteWheel } from "./components";
// import { recipeSchema } from "./schema";

function App() {
  // const chat = useUiChat({
  //   debugName: "breakfast-roulette",
  //   model: "gpt-4.1",
  //   system: `
  //     You are a creative breakfast chef assistant. Generate the wackiest, craziest most unhinged breakfast ideas.

  //     Format recipes with clear ingredients lists, step-by-step directions, servings, and cooking time.

  //     Always respond with structured recipe data that includes:
  //     - title (recipe name)
  //     - ingredients (array of ingredient strings)
  //     - instructions (array of step strings)
  //     - time (time it takes to prepare in string like "20 minutes")
  //     - description (brief description of the recipe)

  //     Use the RecipeCard component to display recipes in an appealing format.

  //     Always generate recipes as UI components using the RecipeCard component for better presentation.
  //   `,
  //   components: [
  //     exposeComponent(RecipeCard, {
  //       name: "RecipeCard",
  //       description: "recipe card",
  //       props: {
  //         recipe: recipeSchema,
  //       },
  //     }),
  //   ],
  // });
  // const result = chat.lastAssistantMessage;

  // const onSubmit = () => {
  //   chat.sendMessage({
  //     role: "user",
  //     content: "What's for breakfast?",
  //   });
  // };
  return (
    <>
      <RouletteWheel />
    </>
  );
}

export default App;
