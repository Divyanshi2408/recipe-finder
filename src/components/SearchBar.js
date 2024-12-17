import React, { useContext, useState } from "react";
import { SearchContext } from "../components/SearchContext"; // Import SearchContext
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SearchBar.css"

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext); // Get search term and setter
  const [isListening, setIsListening] = useState(false); // State for microphone status
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if SpeechRecognition is supported
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); 
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const startVoiceSearch = () => {
    if (!recognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    setIsListening(true);
    recognition.start(); 

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; 
      setSearchTerm(transcript); 
      setIsListening(false);
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="search-bar">
    
      <form onSubmit={handleSearchSubmit}>
      <div className="s-btn">
        <input className="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for recipes..."
        />
       
        <button className="voice"
          type="button"
          onClick={startVoiceSearch}
          disabled={isListening}
        >
          {isListening ? "Listening..." : "🎤 Voice"}
        </button>
        
        <button  className="submit" type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
