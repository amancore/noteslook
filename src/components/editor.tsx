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
		<Card className="flex flex-col overflow-y-hidden h-[calc(99vh-99px)] bg-black text-white border border-white">
			<CardHeader>
				<Input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Note title"
					className="!text-[1rem] p-0 m-0 h-5 w-full border-none focus-visible:ring-0 font-bold bg-black text-white"
				/>
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

			<CardContent className="flex-1 min-h-0 overflow-hidden">
				<Textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Write your note here..."
					className="h-full resize-none !border-none focus-visible:ring-0 p-0 bg-black text-white"
					style={{
						minHeight: 0,
						overflowY: "auto",
						scrollbarWidth: "none",
						msOverflowStyle: "none",
					}}
				/>
			</CardContent>
			<CardFooter className="flex justify-end gap-2 overflow-hidden">
				<Button
					variant="outline"
					onClick={onCancel}
					className="border-white text-white bg-black hover:bg-white hover:text-black">
					<X className="h-4 w-4" />
					Cancel
				</Button>
				<Button
					variant="outline"
					onClick={onHandleSave}
					className="border-white text-white bg-black hover:bg-white hover:text-black">
					<Save className="h-4 w-4" />
					Save
				</Button>
			</CardFooter>
		</Card>
	);
}
