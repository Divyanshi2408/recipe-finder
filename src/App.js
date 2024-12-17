import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./components/SearchContext";
import RecipeDetailsPage from "./components/RecipeDetailsPage";
import SearchResultsPage from "./components/SearchResultsPage";
import Home from "./components/Home";

const App = () => {
  const [selectedMealId, setSelectedMealId] = useState(null);

  return (
    <Router>
      {/* Wrapping the entire app with SearchProvider */}
      <SearchProvider>
      
        <Routes>

          <Route path="/search" 
  element={  selectedMealId ? (
          <RecipeDetailsPage
            mealId={selectedMealId}
            onBack={() => setSelectedMealId(null)}
          />
        ) : (
          <SearchResultsPage onMealSelect={setSelectedMealId} />
        )}
/>

         
          <Route path="/" element={<Home />} />
        </Routes>
        
      </SearchProvider>
    </Router>
  );
};

export default App;
