import Button from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavigateHeader({ category }: { category: string }) {
  const navigate = useRouter();

  return (
    <div className="flex items-center gap-2 mb-2">
      <Button
        className="flex items-center gap-2"
        variant="gradientTealLime"
        onClick={() => navigate.back()}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>

      <Button className="flex items-center gap-2" variant="gradientRedYellow">
        <span className="first-letter:uppercase">{category}</span>
      </Button>
    </div>
  );
}
