import { useState, useEffect, useRef } from 'react';

export default function TranslationPopup() {
  const [selection, setSelection] = useState('');
  const [translation, setTranslation] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close popup when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowPopup(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle text selection
  useEffect(() => {
    const handleSelection = async (e: MouseEvent | TouchEvent) => {
      // Prevent default context menu on mobile
      e.preventDefault();

      const selected = window.getSelection()?.toString().trim();
      if (selected && selected !== selection) {
        setSelection(selected);
        setShowPopup(true);

        try {
          const translated = await fetch('/api/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              text: selected,
              targetLang: 'TR',
              sourceLang: 'EN',
            }),
          });

          const data = await translated.json();
          setTranslation(data.translation);
        } catch (error) {
          console.error('Translation error:', error);
          setTranslation('Translation failed');
        }
      }
    };

    // Add contextmenu event for mobile
    document.addEventListener('contextmenu', handleSelection);
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    return () => {
      document.removeEventListener('contextmenu', handleSelection);
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, [selection]);

  if (!showPopup) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-purple-500 justify-center p-8">
      <p className="text-white text-2xl first-letter:uppercase whitespace-pre-line font-medium">
        {translation}
      </p>
    </div>
  );
}
