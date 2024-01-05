// Main.js
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Group from "./components/Group.js";
import FlashcardManagement from "./components/FlashcardManagement.js";
import FlashCard from "./components/FlashCard.js";
import { InputGroup, FormControl, Dropdown } from "react-bootstrap";
import "./components/Main.css";

import axios from "axios";

function Main(flashcard) {
  const [flashcards, setFlashcards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

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
          lastModified: new Date().toLocaleString(),
          status: "Want to Learn", // Default status
        }))
      );
    });
  }, []);

  const handleEditFlashcard = (editedFlashcard) => {
    // Get the current date on the client side
    const currentDate = new Date().toLocaleString();

    // Update the flashcard data on the server
    axios
      .put(
        `http://localhost:3000/SAMPLE_FLASHCARDS/${editedFlashcard.id}`,
        editedFlashcard
      )
      .then((res) => {
        // Use the lastModified date from the server response
        const updatedFlashcard = res.data;
        console.log("Flashcard updated on the server:", updatedFlashcard);

        setFlashcards((prevFlashcards) => {
          const updatedFlashcards = [...prevFlashcards];
          const editedIndex = updatedFlashcards.findIndex(
            (flashcard) => flashcard.id === updatedFlashcard.id
          );

          if (editedIndex !== -1) {
            // Update the flashcard in the client state with the updated data
            updatedFlashcards[editedIndex] = updatedFlashcard;
          }

          return updatedFlashcards;
        });
      })
      .catch((error) => {
        console.error("Error updating flashcard on the server:", error);
      });
  };

  const handleDeleteFlashcard = (flashcardId) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.filter((flashcard) => flashcard.id !== flashcardId)
    );
  };

  const filteredFlashcards = flashcards.filter((flashcard) => {
    const includesSearchQuery =
      !searchQuery ||
      (flashcard.questions &&
        flashcard.questions.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      !filterDifficulty || flashcard.difficulty === filterDifficulty;

    return includesSearchQuery && matchesDifficulty;
  });

  const difficultyOptions = ["", "Easy", "Medium", "Hard"];

  return (
    <div className="container">
      <h1>Flashcard Management System</h1>
      <div>
        <form>
          <InputGroup className="my-3">
            <FormControl
              placeholder="Search flashcard"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </form>
        <Dropdown className="my-3">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {filterDifficulty || "Filter by difficulty"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {difficultyOptions.map((option) => (
              <Dropdown.Item
                key={option}
                onClick={() => setFilterDifficulty(option)}
              >
                {option || "All"}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <FlashcardManagement setFlashcards={setFlashcards} />
      <Group
        flashcards={filteredFlashcards}
        onDelete={handleDeleteFlashcard}
        onEdit={handleEditFlashcard}
      />
    </div>
  );
}

export default Main;
