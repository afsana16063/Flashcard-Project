import React from "react";
import FlashCard from "./FlashCard";

export default function Group({ flashcards }) {
  return (
    <div className="flashcard-grid">
      {flashcards.map((flashcard) => {
        return <FlashCard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}
