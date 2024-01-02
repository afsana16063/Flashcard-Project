import React, { useState } from "react";
import Group from "./Group";
import "./App.css";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  return <Group flashcards={flashcards} />;
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
