"use client";

import { useEffect, useState } from "react";
import { listenToQuestions } from "@/firebase/questions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function AdminPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setSessionId(resolvedParams.sessionId);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (sessionId) {
      const unsubscribe = listenToQuestions(sessionId, (fetchedQuestions: any) => {
        setQuestions(fetchedQuestions);
      });

      return () => unsubscribe();
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId) {
      const fetchSessionData = async () => {
        try {
          const sessionRef = doc(db, "sessions", sessionId);
          const sessionSnap = await getDoc(sessionRef);

          if (sessionSnap.exists()) {
            setSessionData(sessionSnap.data());
          } else {
            console.error("Session not found.");
          }
        } catch (error) {
          console.error("Error fetching session data:", error);
        }
      };

      fetchSessionData();
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Admin Panel</h1>
      {sessionId && <p>Session ID: {sessionId}</p>}
      {sessionData?.pin && <p>PIN: {sessionData.pin.slice(0, 3)} {sessionData.pin.slice(3)}</p>}

      <div>
        <h2>Questions:</h2>
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              {q.text} (Votes: {q.votes})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
