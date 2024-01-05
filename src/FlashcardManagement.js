// FlashcardManagement.js
import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Group from "./Group";
import "./Main.css";

Modal.setAppElement("#root");

function FlashcardManagement({ setFlashcards }) {
  const [newFlashcard, setNewFlashcard] = useState({
    id: "",
    questions: "",
    answers: "",
    options: [],
    subject: "",
    difficulty: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlashcard((prevFlashcard) => ({
      ...prevFlashcard,
      [name]: value,
    }));
  };

  const handleCreateFlashcard = () => {
    const currentDate = new Date().toLocaleString();
    axios
      .post("http://localhost:3000/SAMPLE_FLASHCARDS", {
        ...newFlashcard,
        id: `${newFlashcard.questions}-${currentDate}`,
        lastModified: currentDate,
      })
      .then((res) => {
        setFlashcards((prevFlashcards) => [
          ...prevFlashcards,
          {
            ...newFlashcard,
            id: `${newFlashcard.questions}-${currentDate}`,
            lastModified: currentDate,
          },
        ]);

        // Reset the form after creating a new flashcard
        setNewFlashcard({
          id: "",
          questions: "",
          answers: "",
          options: [],
          subject: "",
          difficulty: "",
        });

        // Close the modal after creating a new flashcard
        setModalIsOpen(false);
      });
  };

  return (
    <div className="add-flashcard">
      <button onClick={() => setModalIsOpen(true)}>
        Open Flashcard Creation Form
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Create Flashcard Modal"
      >
        <form>
          <label>
            Questions:
            <input
              type="text"
              name="questions"
              value={newFlashcard.questions}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Answers:
            <input
              type="text"
              name="answers"
              value={newFlashcard.answers}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Options (comma-separated):
            <input
              type="text"
              name="options"
              value={newFlashcard.options.join(",")}
              onChange={(e) =>
                setNewFlashcard((prevFlashcard) => ({
                  ...prevFlashcard,
                  options: e.target.value.split(","),
                }))
              }
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={newFlashcard.subject}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Difficulty:
            <input
              type="text"
              name="difficulty"
              value={newFlashcard.difficulty}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleCreateFlashcard}>
            Create Flashcard
          </button>
          <button type="button" onClick={() => setModalIsOpen(false)}>
            Close
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default FlashcardManagement;
