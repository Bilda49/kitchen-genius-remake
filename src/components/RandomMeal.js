import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import "../pages/MainPage/mainPage.css";

const RandomMeal = () => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [recipe, setRecipe] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getDataMain();
  }, []);

  const getDataMain = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/random.php`
      );
      const data = await response.json();

      if (data.meals) {
        const meal = data.meals[0];
        setName(meal.strMeal);
        setRecipe(meal.strInstructions);
        setImg(meal.strMealThumb);
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
        setIngredients([]);
      }
    } catch (error) {
      setIngredients([]);
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>
          <b className="meal-title">{name}</b>
        </Card.Title>
        <Card.Text>Country: {area}</Card.Text>
        <Card.Text>Category: {category}</Card.Text>
        <Accordion alwaysOpen>
          <Accordion.Item eventKey="0" className="recipe-instructions">
            <Accordion.Header>Instructions</Accordion.Header>
            <Accordion.Body>
              <div>{recipe}</div>
            </Accordion.Body>
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
      </Card.Body>
    </Card>
  );
};

export default RandomMeal;
