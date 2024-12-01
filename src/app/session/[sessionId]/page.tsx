import Questions from "../Questions";
import AddQuestion from "../AddQuestion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default async function SessionPage({ params }: { params: { sessionId: string } }) {
  const { sessionId } = await params;

  const sessionRef = doc(db, "sessions", sessionId);
  const sessionSnap = await getDoc(sessionRef);

  let pin = "";
  if (sessionSnap.exists()) {
    const sessionData = sessionSnap.data();
    pin = sessionData.pin || "";
  } else {
    console.error("Session not found.");
  }

  return (
    <div>
      <h1>Session ID: {sessionId}</h1>
      {pin && <h2>PIN: {pin.slice(0, 3)} {pin.slice(3)}</h2>}
      <AddQuestion sessionId={sessionId} />
      <Questions sessionId={sessionId} />
    </div>
  );
}
