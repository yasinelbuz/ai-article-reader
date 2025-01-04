import React from "react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-violet-950/50 to-[#0A0A0B]">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-6xl font-bold text-center mb-6 bg-gradient-to-r from-violet-400 to-indigo-400 text-transparent bg-clip-text">
          ReadNow
        </h1>
        <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto">
          Explore a variety of interesting articles written in English.
        </p>
      </div>
    </div>
  );
}
