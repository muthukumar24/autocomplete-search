import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      console.log("Returned from Cache", input);
      setResults(cache[input]);
      return;
    }

    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const data = await response.json();
    console.log("API Call", input);
    setResults(data.recipes);
    // Updating the Cache with new input keys and values
    setCache((prev) => ({ ...prev, [input]: data.recipes }));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowResults(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="main">
      <h3>Autocomplete Search Bar</h3>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={handleInputChange}
          onFocus={() => setShowResults(false)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && (
          <div className="results-container">
            {results.map((r) => (
              <span className="result" key={r.id}>
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
