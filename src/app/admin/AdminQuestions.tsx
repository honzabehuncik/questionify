"use client";

import { useState } from "react";
import { updateHighlight, updateAnswered } from "@/firebase/questions";

export default function AdminQuestions({ sessionId, questions }: { sessionId: string, questions: any[] }) {
  const [hoveredQuestionId, setHoveredQuestionId] = useState<string | null>(null);

  const handleHighlight = async (questionId: string, isHighlighted: boolean) => {
    await updateHighlight(sessionId, questionId, isHighlighted);
  };

  const handleAnswer = async (questionId: string) => {
    await updateAnswered(sessionId, questionId);
  };

  return (
    <div className="flex-grow overflow-y-auto pb-24 space-y-4">
      {questions.filter(q => !q.isAnswered).map((q) => (
        <div
          key={q.id}
          className={`border ${q.isHighlighted ? "border-[#7371FF] bg-[#7371FF]/[.1]" : "border-[#5C5C5C]"} 
                     rounded-lg p-4 flex flex-col space-y-2`}
          onMouseEnter={() => setHoveredQuestionId(q.id)}
          onMouseLeave={() => setHoveredQuestionId(null)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-secondary50 flex items-center justify-center aspect-square">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                <path fill="#5c5c5c" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
              </svg>
            </div>
            <span className="text-md font-medium text-text">
              {q.userName || "Anonymous"}
            </span>
            <div className="ml-auto flex items-center space-x-2 justify-end w-full">
              {hoveredQuestionId === q.id && (
                <>
                  <button
                    className="w-8 h-8 rounded-full bg-[#5C5C5C] flex items-center justify-center"
                    onClick={() => handleHighlight(q.id, q.isHighlighted)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                      <path fill={q.isHighlighted ? "#7371FF" : "#FFF"} d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
                    </svg>
                  </button>
                  <button
                    className="w-8 h-8 rounded-full bg-[#5C5C5C] flex items-center justify-center"
                    onClick={() => handleAnswer(q.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                      <path fill="#FFF" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
            <span className="text-sm text-secondary">{q.votes}</span>
          </div>
          <p className="text-base text-text">{q.text}</p>
        </div>
      ))}
    </div>
  );
}
