import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import "./RecipeDetailsPage.css";

const RecipeDetailsPage = ({ mealId, onBack }) => {
  const [recipe, setRecipe] = useState(null);
  const detailsRef = useRef(null); 


  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      setRecipe(response.data.meals[0]);

  
      detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    fetchRecipe();
  }, [mealId]);

  // Memoized ingredients list
  const ingredients = useMemo(() => {
    if (!recipe) return [];
    return Array.from({ length: 20 }, (_, index) => index + 1)
      .map((i) => ({
        ingredient: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      }))
      .filter((item) => item.ingredient);
  }, [recipe]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe" ref={detailsRef}>
      <button className="v-btn" onClick={onBack}>
        Back
      </button>
      <h1 className="hea">{recipe.strMeal}</h1>
      <div className="recipes">
        <img
          className="r-img"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
        <ul className="i-list">
          <h1>Ingredients</h1>
          {ingredients.map((item, idx) => (
            <li key={idx}>
              {item.ingredient} - {item.measure}
            </li>
          ))}
        </ul>
      </div>
      <div className="instruction">
        <h1>Instructions:</h1>
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
