import React, { useEffect, useState } from "react";

export default function FlashCard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`flashcard ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="flashcard-questions">
        {flashcard.questions}
        <div className="flashcard-options">
          {flashcard.options.map((option) => {
            return <div className="flashcard-option">{option}</div>;
          })}
        </div>
      </div>
      <div className="flashcard-answers">{flashcard.answers}</div>
    </div>
  );
}
