"use client";
import { Note } from "@/lib/types";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Save, X } from "lucide-react";
import { formateDate } from "@/lib/storage";
interface NoteEditorProps {
	note: Note;
	onSave: (note: Note) => void;
	onCancel: () => void;
}

export default function NoteEditor({
	note,
	onSave,
	onCancel,
}: NoteEditorProps) {
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);

	const onHandleSave = () => {
		onSave({
			...note,
			title: title.trim() || "Untitled Note",
			content,
		});
	};

	return (
		<Card className="flex flex-col overflow-y-hidden h-[calc(99vh-99px)]">
			<CardHeader>
				<Input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Note title"
					className="!text-xl p-0 m-0 h-8 w-full border-none focus-visible:ring-0 font-bold
				"/>
				<p className="text-sm text-muted-foreground">
					{formateDate(note.createdAt)}
				</p>
			</CardHeader>

			<CardContent className="flex-1 min-h-0 overflow-hidden">
				<Textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Write your note here..."
					className="h-full resize-none !border-none focus-visible:ring-0 p-0"
					style={{ minHeight: 0 }}
				/>
			</CardContent>
			<CardFooter className="flex justify-end gap-2 overflow-hidden">
				<Button variant="outline" onClick={onCancel}>
					<X className="h-4 w-4" />
					Cancel
				</Button>
				<Button variant="outline" onClick={onHandleSave}>
					<Save className="h-4 w-4" />
					Save
				</Button>
			</CardFooter>
		</Card>
	);
}
