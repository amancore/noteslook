import { Note } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { formateDate } from "@/lib/storage";

//  Helpers to get/set localStorage positions
const getStoredPositions = (key: string): Record<string, number> => {
	try {
		return JSON.parse(localStorage.getItem(key) || "{}");
	} catch {
		return {};
	}
};

const setStoredPositions = (key: string, data: Record<string, number>) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch {}
};

interface NoteEditorProps {
	note: Note;
	onSave: (note: Note) => void;
}  

export default function NoteEditor({ note, onSave }: NoteEditorProps) {
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);
	const hasChanges = useRef(false);

	const contentRef = useRef<HTMLTextAreaElement | null>(null);
	const titleRef = useRef<HTMLInputElement | null>(null);

	//  Position states
	const [scrollPositions, setScrollPositions] = useState<
		Record<string, number>
	>(() => getStoredPositions("note_scroll_positions"));
	const [cursorPositions, setCursorPositions] = useState<
		Record<string, number>
	>(() => getStoredPositions("note_cursor_positions"));

	// Store both positions to state and localStorage
	const updatePositions = (noteId: string, scroll: number, cursor: number) => {
		const updatedScroll = { ...scrollPositions, [noteId]: scroll };
		const updatedCursor = { ...cursorPositions, [noteId]: cursor };

		setScrollPositions(updatedScroll);
		setCursorPositions(updatedCursor);

		setStoredPositions("note_scroll_positions", updatedScroll);
		setStoredPositions("note_cursor_positions", updatedCursor);
	};

	//  Input change handlers
	const handleChange =
		(
			updater: React.Dispatch<React.SetStateAction<string>>,
			setFlag: boolean = true
		) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			updater(e.target.value);
			if (setFlag) hasChanges.current = true;
		};

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const el = e.target;
		setContent(el.value);
		updatePositions(note.id, el.scrollTop, el.selectionStart);
		hasChanges.current = true;
	};

	const handleBlur = () => {
		saveNote();
	};

	const saveNote = () => {
		if (!hasChanges.current) return;
		onSave({
			...note,
			title: title.trim() || "Untitled Note",
			content,
		});
		hasChanges.current = false;
	};

	//  Restore content, scroll, and cursor when switching notes
	useEffect(() => {
		setTitle(note.title);
		setContent(note.content);
		hasChanges.current = false;

		const isNew = note.title.trim().toLowerCase() === "new note";

		setTimeout(() => {
			if (isNew && titleRef.current) {
				titleRef.current.focus();
				titleRef.current.setSelectionRange(
					titleRef.current.value.length,
					titleRef.current.value.length
				);
			} else if (contentRef.current) {
				const textarea = contentRef.current;
				textarea.focus();

				const scrollTop = scrollPositions[note.id] ?? 0;
				const cursor = cursorPositions[note.id] ?? textarea.value.length;

				textarea.scrollTop = scrollTop;
				textarea.setSelectionRange(cursor, cursor);
			}
		}, 10);
	}, [note.id]);

	//  Save scroll/cursor on unmount
	useEffect(() => {
		return () => {
			if (note.id && contentRef.current) {
				updatePositions(
					note.id,
					contentRef.current.scrollTop,
					contentRef.current.selectionStart
				);
			}
		};
	}, [note.id]);

	//  Track scroll live
	useEffect(() => {
		if (!contentRef.current) return;

		const el = contentRef.current;
		const handleScroll = () => {
			updatePositions(note.id, el.scrollTop, el.selectionStart ?? 0);
		};

		el.addEventListener("scroll", handleScroll);
		return () => el.removeEventListener("scroll", handleScroll);
	}, [note.id]);

	//  Save on visibility or tab close
	useEffect(() => {
		const handleVisibility = () => {
			if (document.visibilityState === "hidden") saveNote();
		};
		const handleBeforeUnload = () => saveNote();

		document.addEventListener("visibilitychange", handleVisibility);
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibility);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [title, content]);

	return (
		<Card className="flex flex-col overflow-y-hidden h-[calc(99vh-99px)] bg-black text-white border border-white">
			<CardHeader>
				<Input
					ref={titleRef}
					value={title}
					onChange={handleChange(setTitle)}
					onBlur={handleBlur}
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

			<div className="border border-white" />

			<CardContent className="flex-1 min-h-0 overflow-hidden">
				<Textarea
					ref={contentRef}
					value={content}
					onChange={handleContentChange}
					onBlur={handleBlur}
					placeholder="Write your note here..."
					className="h-full resize-none !border-none focus-visible:ring-0 p-0 bg-black text-white custom-scrollbar pr-2"
					style={{
						minHeight: 0,
						overflowY: "auto",
					}}
				/>
			</CardContent>
		</Card>
	);
}
