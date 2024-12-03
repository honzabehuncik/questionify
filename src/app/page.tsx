"use client";

import { useState } from "react";
import { useSessionHandlers } from "../hooks/useSessionHandlers";
import Particles from "@/components/particles";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [sessionId, setSessionId] = useState("");
  const { loading, error, joinSession, createSession } = useSessionHandlers();
  const router = useRouter();

  return (
    <div className="min-h-screen text-text font-montserrat relative">
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div onClick={() => router.push('/')} className="cursor-pointer">
              <Image
                src="/logo.svg"
                alt="Questionify logo"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out hover:bg-primary/80" onClick={createSession}>
              {loading ? "Vytvářím..." : "Vytvořit událost"}
            </button>
            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out hover:bg-gray-200" onClick={() => router.push('/chillGuy')}>
              Přihlásit se
            </button>
          </div>
        </nav>

        <div className="flex flex-col items-start justify-center h-[80vh]">
          <h2 className="text-xl mb-2 font-semibold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.rose.100),theme(colors.violet.400),theme(colors.fuchsia.400),theme(colors.violet.400),theme(colors.rose.100))] bg-[length:200%_auto] animate-gradient">Interaktivní nástroj pro vaše události</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Začněte tím, že zadáte <br /> PIN události
          </h1>
          <div className="flex items-center w-full max-w-md space-x-2">
            <input
              type="text"
              placeholder="Zadejte PIN události"
              className="flex-grow bg-white text-black placeholder-secondary px-6 py-4 rounded-full outline-none text-lg"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
            <button
              onClick={() => joinSession(sessionId)}
              className="relative inline-flex justify-center items-center px-6 py-4 rounded-full font-semibold text-white bg-primary transition duration-300 ease-in-out hover:bg-primary/80 before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1000ms]"
            >
              Připojit se
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <div className="flex justify-center lg">
          <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-full text-center flex items-center space-x-5 overflow-hidden max-w-xl border border-white/20 transition duration-300 ease-in-out hover:border-primary">
            <p className="text-lg">
              Nebo vytvořte událost na <span className="text-primary">Questionify</span>
            </p>
            <button
              onClick={createSession}
              className="bg-primary text-white px-4 py-3 rounded-full font-semibold whitespace-nowrap transition duration-300 ease-in-out hover:bg-primary/80"
            >
              {loading ? "Vytvářím..." : "Vytvořit událost"}
            </button>
          </div>
        </div>

      </div>
      <Particles className="absolute -z-10 inset-0 pointer-events-none" quantity={50} />
      <div className="absolute inset-0 -z-20 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#0a0a0a_50%,#6849E1_100%)]"></div>
    </div>
  );
}
