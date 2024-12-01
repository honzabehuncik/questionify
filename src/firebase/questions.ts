import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

// Add question function
export async function addQuestion(sessionId: string, text: string) {
  if (!sessionId || sessionId.trim() === "") {
    throw new Error("Invalid sessionId");
  }
  const questionsRef = collection(db, `sessions/${sessionId}/questions`);
  await addDoc(questionsRef, {
    text,
    votes: 0,
    createdAt: serverTimestamp(),
  });
}

// Realtime question listener
export function listenToQuestions(sessionId: string, callback: Function) {
  if (!sessionId || sessionId.trim() === "") {
    throw new Error("Invalid sessionId");
  }
  const questionsRef = collection(db, `sessions/${sessionId}/questions`);
  const q = query(questionsRef, orderBy("createdAt", "asc"));

  return onSnapshot(q, (snapshot) => {
    const questions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(questions);
  });
}

// Question vote
export async function voteQuestion(sessionId: string, questionId: string, hasVoted: boolean) {
  if (!sessionId || sessionId.trim() === "") {
    throw new Error("Invalid sessionId");
  }
  const questionRef = doc(db, `sessions/${sessionId}/questions`, questionId);
  await updateDoc(questionRef, {
    votes: increment(hasVoted ? -1 : 1),
  });
}
