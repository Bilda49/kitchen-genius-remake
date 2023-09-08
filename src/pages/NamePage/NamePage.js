import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import "./namePage.css";

const NamePage = () => {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const [error, setError] = useState("");

  const getData = async () => {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    let data = await response.json();
    if (data.meals) {
      setMeals(data.meals);
      setError("");
      setCurrentPage(1); // Сбросить текущую страницу после нового поиска
    } else {
      setMeals([]);
      setError("Wrong Name");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData();
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  // Функция для отображения рецептов на текущей странице
  const getCurrentRecipes = () => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    return meals.slice(startIndex, endIndex);
  };

  // Функция для обработки смены страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Прокрутить страницу вверх при изменении страницы
  };

  return (
    <div>
      <div className="instrName">
        <h1>Name Search Page</h1>
        <b>
          This page allows you to search for meal information based on the name
          of a dish you're interested in.
        </b>
        <ul>
          <b>
            <u>Input Your Search</u>
          </b>
          <li>
            At the top of the page, you'll find a search bar. Simply type in the
            name of the meal you want to learn more about and press
            <b> "Enter"</b> on your keyboard.
          </li>
        </ul>
        <ul>
          <b>
            <u>Explore Meal Details</u>
          </b>
          <li>
            Once you've entered a <b>meal name</b> and submitted your search,
            you'll see a list of meal cards displayed below. Each card contains
            the following information:
            <ol>
              <li>
                <b>Meal Image:</b> A picture of the dish to give you a visual
                preview.
              </li>
              <li>
                <b>Meal Name:</b> The name of the meal you searched for.
              </li>
              <li>
                <b>Country:</b> The country or region associated with the meal.
              </li>
              <li>
                <b>Category:</b> The category of the meal.
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <form className="formInpName" onSubmit={handleSubmit}>
        <input
          placeholder="Input meal name (Press Enter)"
          className="inputName"
          name="text"
          type="text"
          value={input}
          onChange={handleInputChange}
        />
      </form>
      <h1 className="error">{error}</h1>
      <div className="cardDivName">
        {getCurrentRecipes().map((meal, index) => (
          <Card className="mainCardName" key={meal.idMeal}>
            <Card.Img variant="top" src={meal.strMealThumb} />
            <Card.Body>
              <Card.Title>{meal.strMeal}</Card.Title>
              <Card.Text>Country: {meal.strArea}</Card.Text>
              <Card.Text>Category: {meal.strCategory}</Card.Text>
              <Accordion alwaysOpen>
                <Accordion.Item
                  eventKey="0"
                  className="recipe-instructions-name"
                >
                  <Accordion.Header>Instructions</Accordion.Header>
                  <Accordion.Body>{meal.strInstructions}</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Ingredients</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {Object.keys(meal).map((key) => {
                        if (key.includes("strIngredient") && meal[key]) {
                          const measureKey = key.replace(
                            "strIngredient",
                            "strMeasure"
                          );
                          return (
                            <li key={key}>
                              {meal[measureKey]} {meal[key]}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span class="transition"></span>
          <span class="gradient"></span>
          <span class="label">Previous</span>
        </button>
        <span className="pageSpanName">
          <b>Page {currentPage}</b>
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            meals.length <= currentPage * recipesPerPage ||
            getCurrentRecipes().length === 0
          }
        >
          <span class="transition"></span>
          <span class="gradient"></span>
          <span class="label">Next</span>
        </button>
      </div>
      <footer className="bottomInfoName">
        Resource:
        <a
          href="https://www.themealdb.com/"
          target="_blank"
          className="footerLink"
        >
          Link to API
        </a>
      </footer>
    </div>
  );
};

export default NamePage;
