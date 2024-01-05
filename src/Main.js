// Main.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Group from "./Group";
import FlashcardManagement from "./FlashcardManagement.js";
import FlashCard from "./FlashCard.js";
import axios from "axios";
import "./Main.css";

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

  const handleEditFlashcard = (editedFlashcard) => {
    setFlashcards((prevFlashcards) => {
      const updatedFlashcards = [...prevFlashcards];
      const editedIndex = updatedFlashcards.findIndex(
        (flashcard) => flashcard.id === editedFlashcard.id
      );
      console.log(updatedFlashcards);
      console.log(editedFlashcard);

      if (editedIndex !== -1) {
        updatedFlashcards[editedIndex] = editedFlashcard;
      }

      return updatedFlashcards;
    });
  };

  const handleDeleteFlashcard = (flashcardId) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.filter((flashcard) => flashcard.id !== flashcardId)
    );
  };
  return (
    <div className="container">
      <h1>Flashcard Management System</h1>
      <FlashcardManagement setFlashcards={setFlashcards} />
      <Group
        flashcards={flashcards}
        onDelete={handleDeleteFlashcard}
        onEdit={handleEditFlashcard}
      />
    </div>
  );
}

export default Main;
