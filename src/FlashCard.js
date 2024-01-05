import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FlashCard({ flashcard, onEdit, onDelete }) {
  const [flip, setFlip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (e) => {
    // Prevent the click event propagation when clicking on edit or delete buttons
    if (e.target.closest(".edit-delete-buttons")) {
      return;
    }

    // Toggle the flip state when clicking on the card
    setFlip(!flip);
  };

  return (
    <div
      className={`flashcard ${flip ? "flip" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="edit-delete-buttons">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(flashcard);
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(flashcard.id);
          }}
        >
          Delete
        </button>
      </div>
      <div className="flashcard-questions">
        {flashcard.questions}
        <div className="flashcard-options">
          {flashcard.options.map((option) => (
            <div className="flashcard-option" key={option}>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="flashcard-answers">{flashcard.answers}</div>
    </div>
  );
}
