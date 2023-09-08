import React, { useState, useEffect } from "react";
import GetDataRecipe from "../../components/GetDataRecipe.js";
import Card from "react-bootstrap/Card";
import "./componentsPage.css";

const ComponentPage = () => {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const recipesPerPage = 5;

  const getData = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
    );
    const data = await response.json();
    if (data.meals) {
      setError("");
      setMeals(data.meals);
      setSearched(true);
      setCurrentPage(1); // Сбросить текущую страницу после нового поиска
    } else {
      setMeals([]);
      setSearched(false);
      setError("Wrong component");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData();
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Прокрутить страницу вверх при изменении страницы
  };

  useState(() => {
    getData();
  }, []);

  return (
    <div>
      <p className="instrComp">
        <h1>Component Search Page</h1>
        <b>This page allows you to search for recipes based on components.</b>
        <ul>
          <b>
            <u>Component Search:</u>
          </b>
          <li>
            At the top of the page, you'll find a search bar. Simply enter the
            name of the component you want to learn more about and click the
            button
            <b> "Enter"</b> on your keyboard.
          </li>
        </ul>
        <ul>
          <b>
            <u>Explore Meal Details</u>
          </b>
          <li>
            Once you've entered a <b>component</b> name and submitted your
            search, you'll see a list of meal cards displayed below. Each card
            contains the following information:
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
      </p>
      <form className="formInpComp" onSubmit={handleSubmit}>
        <input
          placeholder="Input component name (Press Enter)"
          className="inputComp"
          name="text"
          type="text"
          value={input}
          onChange={handleInputChange}
        />
      </form>
      <h1 className="error">{error}</h1>
      <div className="cardDivComp">
        {meals
          .slice(
            (currentPage - 1) * recipesPerPage,
            currentPage * recipesPerPage
          )
          .map((meal) => (
            <div>
              <Card className="mainCardComp" key={meal.idMeal}>
                <Card.Img variant="top" src={meal.strMealThumb} />
                <Card.Body>
                  <Card.Title>{meal.strMeal}</Card.Title>
                  <Card.Text>{meal.strArea}</Card.Text>
                  <GetDataRecipe key={meal.idMeal} recipeName={meal.strMeal} />
                </Card.Body>
              </Card>
            </div>
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
        <span className="pageSpanComp">
          <b>Page {currentPage}</b>
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={meals.length <= currentPage * recipesPerPage}
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

export default ComponentPage;
