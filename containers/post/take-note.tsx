/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Button from '@/components/ui/button';
import { ClipboardPenLine } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { storage } from '@/config/constants';

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function TakeNote({ id, title }: Omit<Note, 'content'>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [note, setNote] = useLocalStorage<Note[] | null>(storage.note, null);
  const noteRead = useReadLocalStorage<Note[] | null>(storage.note);
  const findContent = noteRead?.find(note => note.id === id);
  const [noteContent, setNoteContent] = useState<string>(findContent?.content || '');

  const SaveNote = () => {
    if (findContent) {
      setNote((prevNote: Note[] | null) => {
        if (prevNote) {
          return prevNote.map(note => (note.id === id ? { ...note, content: noteContent } : note));
        }
        return [{ id, title, content: noteContent }];
      });
    } else {
      setNote((prevNote: Note[] | null) => {
        if (prevNote) {
          return [...prevNote, { id, title, content: noteContent }];
        }
        return [{ id, title, content: noteContent }];
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline-purple"
          className="bg-white flex items-center justify-center rounded-full fixed bottom-2 right-2 z-50"
        >
          <ClipboardPenLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new note</DialogTitle>
          <DialogDescription>
            Write down your thoughts or information you want to remember. You can edit or delete
            this note later.
          </DialogDescription>

          <Textarea
            placeholder="Take note..."
            className="h-[200px]"
            defaultValue={noteContent}
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
          />
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => SaveNote()}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
