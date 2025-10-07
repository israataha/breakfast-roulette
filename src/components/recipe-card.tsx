interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  description?: string;
  time?: string;
}

import "./recipe-card.css";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  //const ingredients = recipe.ingredients;
  //const instructions = recipe.directions || recipe.instructions || [];
  //const directionsArray = Array.isArray(directions) ? directions : [];

  console.log("recipe", recipe);

  return (
    <article className="recipe-card" aria-label={recipe.title}>
      <header className="recipe-card__header">
        <h2 className="recipe-card__title">{recipe.title}</h2>
        {recipe.time ? (
          <span className="recipe-card__meta" aria-label="total time">
            ⏱ {recipe.time}
          </span>
        ) : null}
      </header>

      {recipe.description ? <p className="recipe-card__description">{recipe.description}</p> : null}

      <section className="recipe-card__section">
        <h3 className="recipe-card__section-title">Ingredients</h3>
        <ul className="recipe-card__list">
          {recipe.ingredients.map((ingredient, index) => (
            <li className="recipe-card__list-item" key={index}>
              {ingredient}
            </li>
          ))}
        </ul>
      </section>

      <section className="recipe-card__section">
        <h3 className="recipe-card__section-title">Instructions</h3>
        <ol className="recipe-card__list recipe-card__list--numbered">
          {recipe.instructions.map((instruction, index) => (
            <li className="recipe-card__list-item" key={index}>
              {instruction}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
};
