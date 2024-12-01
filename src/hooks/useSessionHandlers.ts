import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, Timestamp, doc, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useSessionHandlers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const generatePin = (): string => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
    const pin = randomNumber.toString();
    return `${pin.slice(0, 3)} ${pin.slice(3)}`;
  };

  const joinSession = async (input: string) => {
    setError("");
    if (input) {
      try {
        const formattedInput = input.replace(/\s/g, "");
        let sessionId: string | null = null;
  
        const sessionRef = doc(db, "sessions", formattedInput);
        const sessionSnap = await getDoc(sessionRef);
        if (sessionSnap.exists()) {
          sessionId = sessionSnap.id;
        }
  
        if (!sessionId) {
          const sessionsQuery = query(
            collection(db, "sessions"),
            where("pin", "==", formattedInput)
          );
          const sessionsSnapshot = await getDocs(sessionsQuery);
          if (!sessionsSnapshot.empty) {
            sessionId = sessionsSnapshot.docs[0].id;
          }
        }
  
        if (sessionId) {
          router.push(`/session/${sessionId}`);
        } else {
          setError("Session with this ID or PIN does not exist.");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setError("An error occurred. Please try again later.");
      }
    } else {
      setError("Please enter a valid Session ID or PIN.");
    }
  };
  

  const createSession = async () => {
    setLoading(true);
    setError("");
    try {
      const pin = generatePin();
      const sessionRef = await addDoc(collection(db, "sessions"), {
        title: "New Session",
        createdBy: "admin",
        createdAt: Timestamp.now(),
        pin: pin.replace(/\s/g, ""),
      });
  
      router.push(`/admin/${sessionRef.id}`);
    } catch (error) {
      console.error("Error creating session:", error);
      setError("An error occurred while creating the session.");
    } finally {
      setLoading(false);
    }
  };
  

  return { loading, error, joinSession, createSession };
};
