import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { formateDate } from "@/lib/storage";
import { Note } from "@/lib/types";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface NoteViewProps {
	note: Note;
	onEdit: () => void;
}

export default function NoteView({ note, onEdit }: NoteViewProps) {
	return (
		<Card className="flex flex-col h-[calc(99vh-99px)] bg-black text-white border border-white">
			<CardHeader>
				<CardTitle className="!text-[1rem] text-white">{note.title}</CardTitle>
				<p className="text-sm text-white opacity-90">
					Created: {formateDate(note.createdAt)}
				</p>
				{note.updatedAt && note.updatedAt !== note.createdAt && (
					<p className="text-xs text-white opacity-90">
						Updated: {formateDate(note.updatedAt)}
					</p>
				)}
			</CardHeader>
			<div className="border border-white"></div>
			<CardContent className="flex-1 min-h-0">
				<ScrollArea className="h-full">
					<p className="whitespace-pre-wrap text-white">{note.content}</p>
				</ScrollArea>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button
					variant="outline"
					onClick={onEdit}
					className="border-white text-white bg-black hover:bg-white hover:text-black">
					Edit Note
				</Button>
			</CardFooter>
		</Card>
	);
}
