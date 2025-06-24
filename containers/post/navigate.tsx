'use client';

import Button from '@/components/ui/button';
import { storage } from '@/config/constants';
import { cn } from '@/utils';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useReadLocalStorage } from 'usehooks-ts';

export default function NavigateHeader({ category, id }: { category: string; id: string }) {
  const navigate = useRouter();
  const isReadLocalStorage = useReadLocalStorage<string[]>(storage.readListId);
  const isRead = isReadLocalStorage?.includes(id) || false;

  console.log('articleID', id);
  console.log('isRead', isRead);
  console.log('isReadLocalStorage', isReadLocalStorage);

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

      <span className={cn('flex items-center gap-2', isRead ? 'flex' : 'hidden')}>
        <span>You have already read this article.</span>
        <Check />
      </span>
    </div>
  );
}
