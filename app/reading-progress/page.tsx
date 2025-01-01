import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Progress",
  description: "Track your reading progress and completed articles.",
};

export default function ReadingProgressPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Reading Progress</h1>

        <div className="space-y-8">
          {/* Buraya okuma ilerlemesi içeriği gelecek */}
          <p className="text-gray-400">
            Your reading progress will be displayed here. Coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
