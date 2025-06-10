"use client";

import { Pause, Play, StopCircle } from "lucide-react";
import { useSpeech } from "react-text-to-speech";
import Button from "../ui/button";

export default function SpeechText({ article }: { article: string}) {
    const { Text, speechStatus, start, pause, stop } = useSpeech({ text: article, pitch: 1, rate: 1, volume: 1, lang: "", voiceURI: "", autoPlay: false, highlightText: true, showOnlyHighlightedText: false, highlightMode: "sentence" });

    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
        <div className="flex items-center gap-2 dark:bg-gray-800 bg-gray-200 rounded-xl p-2 mb-4">
          <Button disabled={speechStatus === "started"} onClick={start} variant="dark" className="flex items-center gap-2">
            <Play />
            <span>Start</span>
          </Button>
          <Button disabled={speechStatus === "paused"} onClick={pause} variant="dark" className="flex items-center gap-2">
            <Pause />
            <span>Pause</span>
          </Button>
          <Button disabled={speechStatus === "stopped"} onClick={stop} variant="dark" className="flex items-center gap-2">
            <StopCircle />
            <span>Stop</span>
          </Button>
        </div>
        <Text />
      </div>
    );
}