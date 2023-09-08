import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import "../pages/CompPage/componentsPage.css";

const GetDataRecipe = ({ recipeName }) => {
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");

  const getRecipe = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`
    );
    const data = await response.json();
    if (data.meals && data.meals[0]) {
      const meal = data.meals[0];
      setRecipe(meal.strInstructions);
      setArea(meal.strArea);
      setCategory(meal.strCategory);
      const ingredientsList = [];
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        if (meal[ingredientKey] && meal[measureKey]) {
          ingredientsList.push({
            ingredient: meal[ingredientKey],
            measure: meal[measureKey],
          });
        }
      }
      setIngredients(ingredientsList);
    } else {
      setRecipe("");
      setIngredients([]);
    }
  };

  useEffect(() => {
    getRecipe();
  }, [recipeName]);

  return (
    <div className="recipe-details">
      <Accordion alwaysOpen>
        <p>Country: {area}</p>
        <p>Category: {category}</p>
        <Accordion.Item eventKey="0" className="recipe-instructions">
          <Accordion.Header>Instructions</Accordion.Header>
          <Accordion.Body>{recipe}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Ingredients</Accordion.Header>
          <Accordion.Body>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.measure} {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default GetDataRecipe;
