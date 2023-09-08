import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import NamePage from "./pages/NamePage/NamePage";
import ComponentPage from "./pages/CompPage/ComponentPage";
import MainPage from "./pages/MainPage/MainPage";
import ScrollNavigation from "./components/ScrollNavigation";

const App = () => {
  return (
    <>
      <ScrollNavigation>
        <nav className="topnav">
          <img
            className="navImg"
            src="https://i.pinimg.com/550x/56/79/3f/56793f386053f9a0ae2f6eda1c5c29f1.jpg"
          ></img>
          <Link to="/">Home</Link>
          <Link to="/name">Search By Name</Link>
          <Link to="/component">Search By Component</Link>
        </nav>
      </ScrollNavigation>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/component" element={<ComponentPage />} />
        <Route path="/name" element={<NamePage />} />
      </Routes>
    </>
  );
};

export default App;
