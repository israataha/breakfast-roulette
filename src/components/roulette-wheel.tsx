import { exposeComponent, useUiChat } from "@hashbrownai/react";
import { useState, useRef } from "react";
import { RecipeCard } from "./";
import { recipeSchema } from "../schema";
import "./roulette-wheel.css";

const breakfastWords = [
  "🥞 Pancakes",
  "🍳 Eggs",
  "🥓 Bacon",
  "🧇 Waffles",
  "🥐 Croissant",
  "🥣 Cereal",
  "🍞 Toast",
  "🥯 Bagel",
  "🥖 French Toast",
  "🍕 Pizza",
  "🥔 Hashbrowns",
  "🌭 Sausage",
];

export const RouletteWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [previousEndDegree, setPreviousEndDegree] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const wheelRef = useRef<HTMLUListElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    const wheelEl = wheelRef.current;
    if (!wheelEl) return;

    setIsSpinning(true);

    if (animationRef.current) {
      animationRef.current.cancel();
    }

    const randomAdditionalDegrees = Math.random() * 360 + 1800;
    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

    animationRef.current = wheelEl.animate(
      [{ transform: `rotate(${previousEndDegree}deg)` }, { transform: `rotate(${newEndDegree}deg)` }],
      {
        duration: 4000,
        easing: "cubic-bezier(0.440, -0.205, 0.000, 1.130)",
        fill: "forwards",
        iterations: 1,
      }
    );

    animationRef.current.onfinish = () => {
      setIsSpinning(false);

      const stopAngle = ((newEndDegree % 360) + 360) % 360; // normalize 0..360
      const sector = 360 / breakfastWords.length;
      const a = (((90 - stopAngle) % 360) + 360) % 360; // align to top pointer
      const idx = Math.round(a / sector);
      console.log("stop angle:", stopAngle);
      console.log("sector:", sector);
      console.log("a:", a);
      console.log("selected index:", idx);
      setSelectedIndex(idx);
    };

    setPreviousEndDegree(newEndDegree);
  };

  const chat = useUiChat({
    debugName: "breakfast-roulette",
    model: "gpt-4.1",
    system: `
      You are a creative breakfast chef assistant. Generate the wackiest, craziest most unhinged breakfast ideas.
 
      Format recipes with clear ingredients lists, step-by-step directions, servings, and cooking time.
      
      Always respond with structured recipe data that includes:
      - title (recipe name)
      - ingredients (array of ingredient strings)
      - instructions (array of step strings)
      - time (time it takes to prepare in string like "20 minutes")
      - description (brief description of the recipe)

      Use the RecipeCard component to display recipes in an appealing format.
      
      Always generate recipes as UI components using the RecipeCard component for better presentation.
    `,
    components: [
      exposeComponent(RecipeCard, {
        name: "RecipeCard",
        description: "recipe card",
        props: {
          recipe: recipeSchema,
        },
      }),
    ],
  });
  const result = chat.lastAssistantMessage;

  const onSubmit = () => {
    chat.sendMessage({
      role: "user",
      content: `Generate a breakfast recipe for ${breakfastWords[selectedIndex || 0]}`,
    });
  };

  return (
    <div className="breakfast-roulette-container">
      <div className="header-section">
        <h1 className="main-title">🍳 Breakfast Roulette 🍳</h1>
        <p className="subtitle">Spin the wheel of breakfast destiny!</p>
      </div>

      <div className="instructions-section">
        <div className="instruction-card">
          <h3>🎯 How to Play</h3>
          <ol className="instruction-steps">
            <li>
              <span className="step-emoji">🎲</span>
              <span className="step-text">
                Click the center of the wheel to spin and select your breakfast ingredient!
              </span>
            </li>
            <li>
              <span className="step-emoji">🍽️</span>
              <span className="step-text">Click "What's for breakfast?" to generate a wacky recipe!</span>
            </li>
            <li>
              <span className="step-emoji">🔄</span>
              <span className="step-text">
                Spin as many times as you want - the breakfast possibilities are endless!
              </span>
            </li>
          </ol>
        </div>
      </div>

      <div className="wheel-section">
        <div className="ui-wheel-of-fortune" aria-live="polite">
          <ul ref={wheelRef}>
            {breakfastWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
          <button
            onClick={handleSpin}
            type="button"
            disabled={isSpinning}
            //className={`spin-button ${isSpinning ? "spinning" : ""}`}
            className="spin-button"
          >
            🎲 SPIN!
          </button>
        </div>
      </div>

      {/* {selectedIndex !== null && (
        <div className="result-section">
          <div className="selected-ingredient">
            <span className="result-label">🎯 Selected Ingredient:</span>
            <span className="ingredient-name">{breakfastWords[selectedIndex]}</span>
          </div>
        </div>
      )} */}

      <div className="action-section">
        <button
          className="recipe-button"
          onClick={() => onSubmit()}
          disabled={!selectedIndex || chat.isReceiving || chat.isSending}
        >
          {chat.isReceiving || chat.isSending ? "🍳 Cooking up something amazing..." : "🍳 What's for breakfast?"}
        </button>
      </div>

      {/* {chat.isReceiving || chat.isSending ? (
        <div className="loading-section">
          <div className="loading-message">
            <span className="cooking-emoji">👨‍🍳</span>
            <span>Creating your breakfast masterpiece...</span>
          </div>
        </div>
      ) : null} */}

      {result && (
        <div className="recipe-section">
          <div>{result.ui}</div>
        </div>
      )}
    </div>
  );
};
