"use client";

import { useEffect, useState } from "react";
import { listenToQuestions, voteQuestion } from "@/firebase/questions";

export default function Questions({ sessionId }: { sessionId: string }) {
  const [questions, setQuestions] = useState([]);
  const [votedQuestions, setVotedQuestions] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const unsubscribe = listenToQuestions(sessionId, (fetchedQuestions: any) => {
      setQuestions(fetchedQuestions);
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
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((q: any) => (
          <li key={q.id}>
            {q.text} (Votes: {q.votes}) 
            <button onClick={() => handleVote(q.id)}>
              {votedQuestions[q.id] ? "Unvote" : "Vote"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
