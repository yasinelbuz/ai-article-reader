import ReadingProgressContainer from "@/containers/reading-progress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Progress",
  description: "Track your reading progress and completed articles.",
};

export default function ReadingProgressPage() {
  return (
    <ReadingProgressContainer />
  );
}
