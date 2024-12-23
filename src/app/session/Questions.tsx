"use client";

import { useEffect, useState } from "react";
import { listenToQuestions, voteQuestion } from "@/firebase/questions";

export default function Questions({ sessionId }: { sessionId: string }) {
  const [questions, setQuestions] = useState([]);
  const [votedQuestions, setVotedQuestions] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const unsubscribe = listenToQuestions(sessionId, (fetchedQuestions: any) => {
      setQuestions(fetchedQuestions.filter((q: any) => !q.isAnswered));
    });

    return () => unsubscribe();
  }, [sessionId]);

  const handleVote = (questionId: string) => {
    const hasVoted = !!votedQuestions[questionId];
    voteQuestion(sessionId, questionId, hasVoted);
    setVotedQuestions((prevState) => ({
      ...prevState,
      [questionId]: !hasVoted,
    }));
  };

  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <div className="flex-grow overflow-y-auto pb-24 space-y-4">
        {questions.map((q: any) => (
          <div
            key={q.id}
            className={`border ${
              q.isHighlighted ? "border-[#7371FF] bg-[#7371FF]/[.1]" : "border-[#5C5C5C]"
            } rounded-lg p-4 flex flex-col space-y-2`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-secondary50 flex items-center justify-center aspect-square">
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
              <span className="text-md font-medium text-text flex-grow">
                {q.userName || "Anonymous"}
              </span>
              <div className="flex-shrink-0 flex items-center space-x-2 justify-end">
                <span
                  className={`text-sm ${
                    votedQuestions[q.id] ? "text-primary" : "text-[#5C5C5C]"
                  }`}
                >
                  {q.votes}
                </span>
                <button
                  onClick={() => handleVote(q.id)}
                  className={`text-sm ${
                    votedQuestions[q.id] ? "text-primary" : "text-[#5C5C5C]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5"
                  >
                    <path
                      fill={votedQuestions[q.id] ? "#7371FF" : "#5c5c5c"}
                      d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-base text-text">{q.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
