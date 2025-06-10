export function analyzeText(text: string) {
  // Kelimeleri boşluk ve noktalama işaretlerine göre ayır
  const words = text.toLowerCase().match(/\b[a-zA-Z']+\b/g) || [];

  const totalWords = words.length;

  // Set kullanarak tekil kelimeleri al
  const uniqueWords = new Set(words);
  const uniqueWordCount = uniqueWords.size;

  // Cümle sayısı: nokta, ünlem, soru işareti ile ayrılan yapılar
  const sentenceCount = (text.match(/[^.!?]*[.!?]/g) || []).length;

  return {
    totalWords,
    uniqueWordCount,
    sentenceCount,
  };
}
