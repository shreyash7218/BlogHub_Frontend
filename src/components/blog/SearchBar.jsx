import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ initialQuery = "", onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    category: "all",
    sortBy: "newest",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();

    if (query.trim()) {
      searchParams.set("search", query);
    }
    if (filters.category !== "all") {
      searchParams.set("category", filters.category);
    }
    if (filters.sortBy !== "newest") {
      searchParams.set("sort", filters.sortBy);
    }

    navigate(`/?${searchParams.toString()}`);
    if (onSearch) {
      onSearch(query, filters);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setFilters({
      category: "all",
      sortBy: "newest",
    });
    navigate("/");
    if (onSearch) {
      onSearch("", { category: "all", sortBy: "newest" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="flex gap-4">

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-6 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="popular">Most Popular</option>
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
