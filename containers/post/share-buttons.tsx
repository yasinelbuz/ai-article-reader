/* eslint-disable react/no-unescaped-entities */
import Button from '@/components/ui/button';

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  return (
    <div className="flex items-center gap-2 mt-12">
      <Button variant="gradientPurplePink" className="flex items-center gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            'ReadNow: ' + title
          )}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter'da Paylaş
        </a>
      </Button>
      <Button variant="gradientRedYellow" className="flex items-center gap-2">
        <a
          href={`https://web.whatsapp.com/send/?text=${encodeURIComponent(
            'ReadNow: ' + title + ' ' + window.location.href
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp'ta Paylaş
        </a>
      </Button>
    </div>
  );
}
