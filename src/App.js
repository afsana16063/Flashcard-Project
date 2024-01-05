// App.js
import React, { useState } from "react";
import Home from "./Home";
import Main from "./Main";
import Contact from "./Contact";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      {/* Add other pages as needed */}
      <div className="MainButtons">
        <button
          className="btn btn_home"
          onClick={() => handleNavigation("home")}
        >
          Go to Home
        </button>
        <button
          className="btn btn_main"
          onClick={() => handleNavigation("main")}
        >
          Go to Main
        </button>
        <button
          className="btn btn_contact"
          onClick={() => handleNavigation("contact")}
        >
          Go to Contact me
        </button>
      </div>
      <div>
        {currentPage === "home" && <Home />}
        {currentPage === "main" && <Main />}
        {currentPage === "contact" && <Contact />}
      </div>
    </div>
  );
}

export default App;
