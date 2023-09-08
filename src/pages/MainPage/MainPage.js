import "./mainPage.css";
import RandomMeal from "../../components/RandomMeal";

const MainPage = () => {
  return (
    <div className="mainPage">
      <div className="infoAbout">
        <h3 className="h3Tag">
          <b>Welcome to Our Culinary Portal!</b>
          <br />
          <br />
        </h3>
        <p>
          <b>
            Our pages are filled with a variety of recipes that will help you
            prepare delicious and diverse dishes. Regardless of your culinary
            experience, you'll find something interesting and inspiring to cook
            here.
          </b>
        </p>
        <b>Website Features:</b>
        <ul>
          <li>
            <b>Recipe Search: </b>Use our convenient search to find recipes
            based on your favorite ingredients or dishes.
          </li>
          <li>
            <b>Instructions and Ingredients: </b>Each recipe comes with detailed
            preparation instructions and a list of required ingredients.
          </li>
          <li>
            <b>Interactive Recipe Cards: </b>Browse colorful cards featuring
            photos of dishes, their names, and country of origin.
          </li>
          <li>
            <b>Categories and Tags: </b>Filter recipes by categories and tags to
            quickly find the dish you're looking for.
          </li>
          <li>
            <b>Pagination: </b>Convenient navigation between recipe pages,
            allowing you to easily browse through a large number of recipes.
          </li>
          <li>
            <b>Dish Information: </b>Discover the country of origin and category
            of each dish.
          </li>
          <li>
            <b>Cooking Instructions: </b>Learn how to prepare each dish
            step-by-step with detailed instructions and tips.
          </li>
          <li>
            <b>Share Your Own Recipes: </b>Share your own recipes with the
            community.
          </li>
        </ul>
        <p>
          <b>
            Use the search field to quickly find recipes that interest you.
            Explore categories and tags to discover new cooking ideas. Read
            detailed instructions, prepare, and enjoy delicious dishes with us!
          </b>
        </p>
        <br />
        <b>Thank you for choosing our website for culinary exploration.</b>
        <h2>
          <br />
          <b>Bon appétit!</b>
        </h2>
      </div>
      <h2 className="suggestedTitle">Suggested Meals:</h2>
      <div className="divWithRandom">
        <RandomMeal />
        <RandomMeal />
        <RandomMeal />
        <RandomMeal />
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

export default MainPage;
