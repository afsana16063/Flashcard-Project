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

// import React, { useState, useEffect } from "react";
// import Group from "./Group";
// import "./App.css";
// import axios from "axios";

// function App() {
//   const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

//   useEffect(() => {
//     axios.get("http://localhost:8000/SAMPLE_FLASHCARDS").then((res) => {
//       // console.log("Flashcards data:", res.data);
//       setFlashcards(
//         res.data.map((questionItem, index) => {
//           // console.log("Mapping flashcard:", questionItem);
//           return {
//             id: `${index}-${Date.now()}`,
//             questions: questionItem.questions || questionItem.question,
//             answers: questionItem.answers,
//             options: questionItem.options,
//             subject: questionItem.subject,
//             difficulty: questionItem.difficulty,
//           };
//         })
//       );

//       // console.log(res.data);
//     });
//   }, []);

//   return (
//     <div className="container">
//       <Group flashcards={flashcards} />;
//     </div>
//   );
// }

// const SAMPLE_FLASHCARDS = [
//   {
//     id: 1,
//     questions: "What is the capital of Azerbaijan?",
//     answers: "Baku",
//     options: ["Istanbul", "Ganja", "London", "Baku"],
//   },
//   {
//     id: 2,
//     questions: "This is a question",
//     answers: "This is an answer",
//     options: ["Option 1", "Option 2", "Option 3", "Option 4"],
//   },
//   {
//     id: 3,
//     questions: "This is a question",
//     answers: "This is an answer",
//     options: ["Option 1", "Option 2", "Option 3", "Option 4"],
//   },
// ];

// export default App;
