import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./Main.css";

export default function FlashCard({ flashcard, onEdit, onDelete }) {
  const [flip, setFlip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedStatus, setEditedStatus] = useState(flashcard.status);

  const handleCardClick = (e) => {
    // Prevent the click event propagation when clicking on edit or delete buttons
    if (e.target.closest(".edit-delete-buttons")) {
      return;
    }

    // Toggle the flip state when clicking on the card
    setFlip(!flip);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setEditedStatus(newStatus);
    onEdit({ ...flashcard, status: newStatus });
  };

  // Format the lastModified date using date-fns
  const formattedLastModified = format(
    new Date(flashcard.lastModified),
    "MM/dd/yyyy, hh:mm:ss a"
  );

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
            console.log("Edit button clicked");
            onEdit(flashcard.id); // Pass the specific flashcard to onEdit
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
      {/* {flip && ( */}
      <div className="status">
        Status:
        <select value={editedStatus} onChange={handleStatusChange}>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
      </div>
      <div className="last-modified">
        Last Modified: {formattedLastModified}
      </div>
    </div>
  );
}
