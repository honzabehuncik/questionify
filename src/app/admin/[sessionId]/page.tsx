"use client";

import { useEffect, useState } from "react";
import { listenToQuestions } from "@/firebase/questions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import AdminQuestions from "../AdminQuestions";

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
    <div className="bg-background text-text min-h-screen flex flex-col">
      <div className="container mx-auto px-20 py-4 flex justify-between items-center">
        <div
          className="flex items-center space-x-4 text-white p-4 rounded-lg w-80"
          style={{ backgroundColor: 'rgba(115, 113, 255, 0.1)', border: '1px solid #7371FF' }}
        >
          <div className="flex flex-col">
            <span className="text-sm">Připojte se na událost pomocí PIN kódu:</span>
            <span className="text-4xl font-bold">
              {sessionData?.pin && `${sessionData.pin.slice(0, 3)} ${sessionData.pin.slice(3)}`}
            </span>
          </div>
        </div>
        <div className="flex items-center bg-primary text-white p-3 rounded-full">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold">{questions.length}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 text-white">
                <path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-20 py-4 flex-grow">
        {sessionId && <AdminQuestions sessionId={sessionId} questions={questions} />}
      </div>
    </div>
  );
}
