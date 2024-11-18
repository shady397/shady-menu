import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";
import logo from "./logo.JPG";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

const App = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  const sortItems = (sortBy) => {
    setSortBy(sortBy);
    let sortedItems = [...menuItems];
    switch (sortBy) {
      case "price-asc":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "category":
        sortedItems.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        sortedItems = items;
        break;
    }
    setMenuItems(sortedItems);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMenuItems(filteredItems);
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <img src={logo} alt="logo" className="logo" />
          <h2>Menu List</h2>
          <div className="underline"></div>
        </div>
        <div className="filter-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            filterItems={filterItems}
          />
          <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => sortItems(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
        <Menu items={menuItems} />
      </section>
    </main>
  );
};

export default App;