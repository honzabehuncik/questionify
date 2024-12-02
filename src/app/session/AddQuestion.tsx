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
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background flex items-center justify-center space-x-4">
      <div className="relative w-1/2">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-secondary50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5">
            <path fill="#5c5c5c" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
          </svg>
        </div>


        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Zadejte Vaší otázku..."
          className="bg-[#181818] border border-[#5C5C5C] text-text rounded-full w-full py-4 pl-16 pr-16 focus:outline-none"
        />

        <button
          onClick={handleAddQuestion}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6">
            <path fill="#ffffff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
