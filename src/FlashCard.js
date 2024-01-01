import React, { useState } from "react";

export default function FlashCard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  return (
    <div onClick={() => setFlip(!flip)}>
      {flip ? flashcard.answer : flashcard.questions}
    </div>
  );
}
