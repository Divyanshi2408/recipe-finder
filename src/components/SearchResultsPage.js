import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation for accessing query params
import axios from "axios"; // Assuming you're using axios for API calls

const SearchResultsPage = ({onMealSelect }) => {
  const location = useLocation(); // Access the location object to get query params
  const [searchResults, setSearchResults] = useState([]);

  // Extract query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  useEffect(() => {
    if (searchTerm) {
      // Fetch recipes based on searchTerm
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
          );
          setSearchResults(response.data.meals || []);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.length > 0 ? (
        <div className="meal">
          {searchResults.map((meal) => (
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
      ) : (
        <p>No results found for "{searchTerm}".</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
