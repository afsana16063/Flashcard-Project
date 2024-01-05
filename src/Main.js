// Main.js
import React, { useState, useEffect } from "react";
import Group from "./Group";
import axios from "axios";
import "./Main.css";
import FlashcardManagement from "./FlashcardManagement.js";

function Main() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/SAMPLE_FLASHCARDS").then((res) => {
      setFlashcards(
        res.data.map((questionItem, index) => ({
          id: `${index}-${Date.now()}`,
          questions: questionItem.questions || questionItem.question,
          answers: questionItem.answers,
          options: questionItem.options,
          subject: questionItem.subject,
          difficulty: questionItem.difficulty,
        }))
      );
    });
  }, []);

  return (
    <div className="container">
      <h1>Flashcard Management System</h1>
      <FlashcardManagement setFlashcards={setFlashcards} />
      <Group flashcards={flashcards} />
    </div>
  );
}

export default Main;
