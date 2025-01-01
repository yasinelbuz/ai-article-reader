import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Words",
  description: "Review and manage your saved vocabulary words from articles.",
};

export default function SavedWordsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Saved Words</h1>

        <div className="space-y-8">
          {/* Buraya kaydedilen kelimeler içeriği gelecek */}
          <p className="text-gray-400">
            Your saved vocabulary words will appear here. Coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
