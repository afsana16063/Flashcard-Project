import React, { useState, useEffect } from "react";
import Group from "./Group";
import "./App.css";
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  useEffect(() => {
    axios.get("http://localhost:8000/SAMPLE_FLASHCARDS").then((res) => {
      // console.log("Flashcards data:", res.data);
      setFlashcards(
        res.data.map((questionItem, index) => {
          // console.log("Mapping flashcard:", questionItem);
          return {
            id: `${index}-${Date.now()}`,
            questions: questionItem.questions || questionItem.question,
            answers: questionItem.answers,
            options: questionItem.options,
            subject: questionItem.subject,
            difficulty: questionItem.difficulty,
          };
        })
      );

      // console.log(res.data);
    });
  }, []);

  return (
    <div className="container">
      <Group flashcards={flashcards} />;
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    questions: "What is the capital of Azerbaijan?",
    answers: "Baku",
    options: ["Istanbul", "Ganja", "London", "Baku"],
  },
  {
    id: 2,
    questions: "This is a question",
    answers: "This is an answer",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
  {
    id: 3,
    questions: "This is a question",
    answers: "This is an answer",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  },
];

export default App;
