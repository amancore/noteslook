"use client";
import { useState, useEffect } from "react";
import { Note } from "@/lib/types";
import SideBar from "@/components/sidebar";
import Header from "@/components/header";
import EmptyState from "@/components/empty-state";
import NoteEditor from "@/components/editor"; // Only editor now
import { loadNotes, saveNotes } from "@/lib/storage";

export default function Home() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [activeNote, setActiveNote] = useState<Note | null>(null);

	useEffect(() => {
		const loadedNotes = loadNotes();
		const sorted = [...loadedNotes].sort((a, b) => b.updatedAt - a.updatedAt);
		setNotes(sorted);
		if (sorted.length > 0) {
			setActiveNote(sorted[0]);
		}
	}, []);

	useEffect(() => {
		saveNotes(notes);
	}, [notes]);

	const createNewNote = () => {
		const newNote: Note = {
			id: Date.now().toString(),
			title: "New Note",
			content: "",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		setNotes([newNote, ...notes]);
		setActiveNote(newNote);
	};

	const selectNote = (note: Note) => {
		setActiveNote(note);
	};

	const saveNote = (updatedNote: Note) => {
		const updated = {
			...updatedNote,
			updatedAt: Date.now(),
		};
		setNotes((prevNotes) =>
			prevNotes.map((note) => (note.id === updated.id ? updated : note))
		);
		setActiveNote(updated);
	};

	const deleteNote = (id: string) => {
		setNotes(notes.filter((note) => note.id !== id));
		if (activeNote && activeNote.id === id) {
			setActiveNote(null);
		}
	};

	const renderNoteContent = () => {
		if (!activeNote && notes.length === 0) {
			return (
				<EmptyState
					message="Create your first note to get started"
					buttonText="New Note"
					onButtonClick={createNewNote}
				/>
			);
		}
		if (activeNote) {
			return <NoteEditor note={activeNote} onSave={saveNote} />;
		}
		return null;
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header onNewNote={createNewNote} />
			<main className="container mx-auto py-4 grid grid-col-2 md:grid-cols-3 gap-6 flex-1">
				<div className="md:col-span-1">
					<SideBar
						notes={[...notes].sort((a, b) => b.updatedAt - a.updatedAt)}
						onSelectNote={selectNote}
						createNewNote={createNewNote}
						onDeleteNote={deleteNote}
						activeNoteId={activeNote?.id}
					/>
				</div>
				<div className="md:col-span-2">{renderNoteContent()}</div>
			</main>
		</div>
	);
}
  