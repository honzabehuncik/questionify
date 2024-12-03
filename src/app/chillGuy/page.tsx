"use client";

import { useEffect } from 'react';
import Particles from "@/components/particles";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ChillGuy() {
  useEffect(() => {
    const audio = document.getElementById('chill-guy-music') as HTMLAudioElement | null;
    if (audio) {
      audio.volume = 0.15;
    }
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-screen text-text font-montserrat relative flex flex-col justify-center items-center">
      <Image
        src="/chill-guy.png"
        alt="Chill Guy"
        width={500}
        height={500}
        className="mb-4 animate-pump"
      />
      <p className="text-white text-2xl pt-24">login zatím nebyl implementován</p>
      <p className="text-highlight text-2xl">i'm just a chill guy</p>
      <audio id="chill-guy-music" src="/chill-guy-music.mp3" autoPlay loop />
      <Particles className="absolute -z-10 inset-0 pointer-events-none" quantity={50} />
      <div className="absolute inset-0 -z-20 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#0a0a0a_50%,#6849E1_100%)]"></div>
      <button className="bg-white text-black px-6 py-2 rounded-full font-semibold transition duration-300 ease-in-out hover:bg-gray-200 absolute bottom-10" onClick={() => router.push('/')}>
        Vrátit se zpět
      </button>
    </div>
  );
}
