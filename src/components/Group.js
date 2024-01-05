// Group.js
import React from "react";
import FlashCard from "./FlashCard";

export default function Group({ flashcards, onEdit, onDelete }) {
  const sortedFlashcards = flashcards.slice().sort((a, b) => {
    return new Date(b.lastModified) - new Date(a.lastModified);
  });

  return (
    <div className="flashcard-grid">
      {sortedFlashcards.map((flashcard) => (
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
