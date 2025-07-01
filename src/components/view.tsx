import React from 'react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { formateDate } from '@/lib/storage';
import { Note } from '@/lib/types';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
interface NoteViewProps {
	note: Note;
	onEdit: () => void;
}
export default function NoteView({note,onEdit}: NoteViewProps) {
  return (
		<Card>
			<CardHeader>
				<CardTitle>{note.title}</CardTitle>
				<p className="text-sm text-muted-foreground">
					{formateDate(note.createdAt)}
				</p>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[calc(78vh-78px)]">
					<p className="text whitespace-pre-wrap">
						{note.content}
					</p>
				</ScrollArea>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button onClick={onEdit}>Edit Note</Button>
			</CardFooter>
		</Card>
	);
}
