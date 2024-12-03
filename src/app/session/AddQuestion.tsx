"use client";

import { useState } from "react";
import { addQuestion } from "@/firebase/questions";

export default function AddQuestion({ sessionId }: { sessionId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [userName, setUserName] = useState("");

  const handleAddQuestion = async () => {
    if (questionText) {
      const nameToUse = userName.trim() || "Anonymous";
      await addQuestion(sessionId, questionText, nameToUse);
      setQuestionText("");
      setUserName("");
      setIsExpanded(false); // Sbalení formuláře po odeslání
    }
  };

  const handleFocus = () => setIsExpanded(true);
  const handleBlur = (e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsExpanded(false);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 p-4 bg-background flex items-center justify-center"
      onBlur={handleBlur}
    >
      <form
        className={`transition-all duration-300 flex flex-col items-start bg-[#1F1F1F] border border-[#5C5C5C] ${
          isExpanded ? "rounded-lg p-1 w-2/3" : "rounded-full p-2 w-1/2"
        }`}
      >
        {isExpanded && (
          <div className="relative w-full mb-4">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-secondary50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4"
              >
                <path
                  fill="#5c5c5c"
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="bg-transparent text-text border-b border-[#5C5C5C] focus:outline-none pl-16 py-5 w-full"
              placeholder="Vaše jméno (nepovinné)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        )}
<div className="relative w-full">
  {!isExpanded && (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-secondary50 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-4 h-4"
      >
        <path
          fill="#5c5c5c"
          d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
        />
      </svg>
    </div>
  )}
  <textarea
    className={`w-full bg-transparent text-text border-none focus:outline-none resize-none ${
      isExpanded ? "pl-4 pr-16 pt-1" : "pl-16 pr-16 pt-2"
    }`}
    placeholder={isExpanded ? "Zadejte vaší otázku..." : "Zadejte vaší otázku..."}
    rows={isExpanded ? 3 : 1}
    value={questionText}
    onFocus={handleFocus}
    onChange={(e) => setQuestionText(e.target.value)}
  />
  <button
    type="button"
    className={`absolute ${
      isExpanded
        ? "right-2 bottom-2 w-8 h-8"
        : "right-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
    } rounded-full bg-primary flex items-center justify-center`}
    onClick={handleAddQuestion}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className="w-6 h-6"
    >
      <path
        fill="#ffffff"
        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
      />
    </svg>
  </button>
</div>



      </form>
    </div>
  );
}
