import React from "react";
import FlashCard from "./FlashCard";

export default function Group({ flashcards, onEdit, onDelete }) {
  return (
    <div className="flashcard-grid">
      {flashcards.map((flashcard) => (
        <FlashCard
          flashcard={flashcard}
          key={flashcard.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
