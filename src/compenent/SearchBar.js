import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Rechercher albums ou musiques..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
