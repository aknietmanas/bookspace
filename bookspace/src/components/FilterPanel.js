// src/components/FilterPanel.js
import React from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-panel">
      <input
        type="text"
        name="author"
        placeholder="Filter by author"
        value={filters.author}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Filter by category"
        value={filters.category}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterPanel;
