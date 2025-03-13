'use client'
import { Note } from "@/lib/types";
interface NoteEditorProps {
	note: Note;
	onSave: (node: Note) => void;
	onCancel: () => void;
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {Button} from "./ui/button"
import { Save, X } from "lucide-react";
export default function NoteEditor({ note, onSave,onCancel }: NoteEditorProps) {
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);
	const onHandleSave = () => {
		onSave({
			...note,
			title: title.trim() || 'Untitled Note',
			content,
		})
	}
	return (
		<Card>
			<CardHeader>
				<Input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Note title"
					className="text-xl font-bold border-none px-0 focus-visible:ring-0"
				/>
			</CardHeader>
			<CardContent>
				<Textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Write your note here..."
					className="h-[calc(100vh-350px)] resize-none border-none focus-visible:ring-0 p-0"
					/>
			</CardContent>
			<CardFooter className="flex justify-end space-x-2">
				<Button variant="outline" onClick={onCancel}>
					<X className="h-4 w-4 mr-2" />
					Cancel
				</Button>
				<Button onClick={onHandleSave}>
					<Save className="h-4 w-4 mr-2" />
					Save
				</Button>
			</CardFooter>
		</Card>
	);
}
