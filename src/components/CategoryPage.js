import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import "./CategoryPage.css";

const CategoryPage = ({ onMealSelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Dessert");
  const [meals, setMeals] = useState([]);
  const mealContainerRef = useRef(null); // Ref for the meal container

  // Fetch categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    };
    fetchCategories();
  }, []);

  // Fetch meals for the selected category
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      );
      setMeals(response.data.meals);

      // Scroll to meal container when category changes
      
    };
    fetchMeals();
  }, [selectedCategory]);

  // Memoized category buttons to prevent unnecessary re-renders
  const categoryButtons = useMemo(() => {
    return categories.map((category) => (
      <button
        key={category.idCategory}
        onClick={() => setSelectedCategory(category.strCategory)}
        className={`c-btn ${
          selectedCategory === category.strCategory ? "selected" : "not-selected"
        }`}
      >
        {category.strCategory}
      </button>
    ));
  }, [categories, selectedCategory]);

  return (
    <div className="con">
      <h1>Recipe Finder</h1>

      {/* Category Selection */}
      <div className="r-container">{categoryButtons}</div>

      {/* Meals Display */}
      <div ref={mealContainerRef} className="meal">
        {meals.map((meal) => (
          <div key={meal.idMeal} style={{ textAlign: "center" }} className="card">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{meal.strMeal}</h3>
            <button
              className="v-btn"
              onClick={() => onMealSelect && onMealSelect(meal.idMeal)} // Check if onMealSelect is provided
            >
              View Recipe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
