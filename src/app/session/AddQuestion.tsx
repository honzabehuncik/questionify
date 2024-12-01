"use client";

import { useState } from "react";
import { addQuestion } from "@/firebase/questions";

export default function AddQuestion({ sessionId }: { sessionId: string }) {
  const [questionText, setQuestionText] = useState("");

  const handleAddQuestion = async () => {
    if (questionText) {
      await addQuestion(sessionId, questionText);
      setQuestionText("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={handleAddQuestion}>Submit Question</button>
    </div>
  );
}
