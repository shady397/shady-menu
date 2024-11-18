import React, { useState } from "react";

const Menu = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleNutritionalInfo = (item) => {
    setSelectedItem(item.id === selectedItem ? null : item.id);
  };

  return (
    <div className="section-center">
      {items.map((item) => {
        const { id, title, img, desc, price, calories, protein, carbs, fat, allergens } = item;
        const isSelected = id === selectedItem;
        return (
          <article key={id} className="menu-item">
            <img
              src={img}
              alt={title}
              className="photo"
              onClick={() => toggleNutritionalInfo(item)}
            />
            <div className="item-info">
              <header>
                <h4 onClick={() => toggleNutritionalInfo(item)}>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              <p className="item-text">{desc}</p>
              {isSelected && (
                <div className="nutritional-info">
                  <p>Calories: {calories}</p>
                  <p>Protein: {protein}g</p>
                  <p>Carbs: {carbs}g</p>
                  <p>Fat: {fat}g</p>
                  <p>Allergens: {allergens.join(', ')}</p>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;