import Button from '@/components/ui/button';
import { storage } from '@/config/constants';
import { Check } from 'lucide-react';
import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

export default function IReadButton({ id }: { id: string }) {
  const [readList, setReadList] = useLocalStorage<string[]>(storage.readListId, []);
  const isRead = readList?.includes(id) || false;

  const handleToggleReadStatus = () => {
    const currentList = readList || [];
    if (isRead) {
      // Remove from read list
      const newReadList = currentList.filter(item => item !== id);
      setReadList(newReadList);
    } else {
      // Add to read list
      const newReadList = [...currentList, id];
      setReadList(newReadList);
    }
  };

  return (
    <Button
      variant={isRead ? 'gradientCyanBlue' : 'gradientPinkOrange'}
      disabled={!readList}
      className="mt-6 flex items-center gap-2 w-full h-24 text-center"
      onClick={handleToggleReadStatus}
    >
      {isRead ? (
        <>
          Mark as Unread
          <Check className="w-4 h-4" />
        </>
      ) : (
        'Mark as Read'
      )}
    </Button>
  );
}
