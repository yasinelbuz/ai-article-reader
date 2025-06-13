import { useState, useEffect, useRef } from 'react';

interface LanguagePair {
  from: string;
  to: string;
  label: string;
}

const languagePairs: LanguagePair[] = [
  { from: 'EN', to: 'TR', label: 'English → Turkish' },
  { from: 'TR', to: 'EN', label: 'Turkish → English' },
  { from: 'DE', to: 'TR', label: 'German → Turkish' },
  { from: 'TR', to: 'DE', label: 'Turkish → German' },
];

interface Theme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

const lightTheme: Theme = {
  backgroundColor: 'white',
  textColor: 'black',
  borderColor: '#ddd',
};

const darkTheme: Theme = {
  backgroundColor: '#1a1a1a',
  textColor: '#ffffff',
  borderColor: '#333',
};

export default function TranslationPopup() {
  const [selection, setSelection] = useState('');
  const [translation, setTranslation] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPair, setSelectedPair] = useState(languagePairs[0]);
  const popupRef = useRef<HTMLDivElement>(null);

  // Get theme from local storage or use dark as default
  const theme = localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme;

  // Get position of selected text
  const getPosition = () => {
    const range = window.getSelection()?.getRangeAt(0);
    if (!range) return { top: 0, left: 0 };

    const rect = range.getBoundingClientRect();
    const popupWidth = 200; // Estimated width
    const popupHeight = 150; // Estimated height

    // Position popup above the selected text
    let top = rect.top + window.scrollY - popupHeight;
    let left = rect.left + window.scrollX;

    // Adjust position if popup would be out of viewport
    if (top < 0) {
      top = rect.top + window.scrollY + 10;
    }
    if (left + popupWidth > window.innerWidth) {
      left = window.innerWidth - popupWidth;
    }

    return { top, left };
  };

  const position = getPosition();

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

  // Close popup when focus moves outside
  useEffect(() => {
    const handleBlur = () => {
      setShowPopup(false);
    };

    document.addEventListener('blur', handleBlur);
    return () => {
      document.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Handle text selection
  useEffect(() => {
    const handleSelection = async () => {
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
              targetLang: selectedPair.to,
              sourceLang: selectedPair.from,
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

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, [selection, selectedPair]);

  if (!showPopup) return null;

  return (
    <div
      ref={popupRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 1000,
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        minWidth: '200px',
        border: `1px solid ${theme.borderColor}`,
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <select
          value={`${selectedPair.from}-${selectedPair.to}`}
          onChange={e => {
            const [from, to] = e.target.value.split('-');
            const pair = languagePairs.find(p => p.from === from && p.to === to);
            if (pair) setSelectedPair(pair);
          }}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '4px',
            border: `1px solid ${theme.borderColor}`,
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
          }}
        >
          {languagePairs.map(pair => (
            <option key={pair.from + pair.to} value={`${pair.from}-${pair.to}`}>
              {pair.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong style={{ color: theme.textColor }}>Original:</strong>
        <p style={{ margin: '0.5rem 0', color: theme.textColor }}>{selection}</p>
      </div>

      <div>
        <strong style={{ color: theme.textColor }}>Translation:</strong>
        <p style={{ margin: '0.5rem 0', color: theme.textColor }}>{translation}</p>
      </div>
    </div>
  );
}
