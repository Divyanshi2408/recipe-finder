import React, { createContext, useState, useContext } from "react";

// Create Context
export const SearchContext = createContext();

// Custom Hook to use Search Context
export const useSearch = () => useContext(SearchContext);

// SearchProvider component to wrap the app and provide the search context
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
