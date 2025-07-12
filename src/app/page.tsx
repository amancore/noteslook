"use client";
import { useState, useEffect } from "react";
import { Note } from "@/lib/types";
import SideBar from "@/components/sidebar";
import Header from "@/components/header";
import EmptyState from "@/components/empty-state";
import NoteEditor from "@/components/editor";
import { useAuth } from "@/lib/useAuth";
import Hero from "@/components/Hero";
import { getUserNotes, saveUserNote, deleteUserNote } from "@/lib/firestore";

export default function Home() {
	const { user, loading } = useAuth();
	const [notes, setNotes] = useState<Note[]>([]);
	const [activeNote, setActiveNote] = useState<Note | null>(null);

	// Create new note
	const createNewNote = async () => {
		if (!user) return;
		const newNote: Note = {
			id: Date.now().toString(),
			title: "New Note",
			content: "",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		setNotes((prev) => [newNote, ...prev]);
		setActiveNote(newNote);
		await saveUserNote(user.uid, newNote);
	};

	const handleDeleteNote = async (id: string) => {
		setNotes((prev) => prev.filter((n) => n.id !== id));
		if (activeNote?.id === id) setActiveNote(null);
		await deleteUserNote(id);
	};

	useEffect(() => {
		if (!user) return;
		getUserNotes(user.uid).then((loaded) => {
			const sorted = loaded.sort((a, b) => b.updatedAt - a.updatedAt);
			setNotes(sorted);
			if (sorted.length > 0) setActiveNote(sorted[0]);
		});
	}, [user?.uid]);

	// Wait until auth is ready
	if (loading) {
		return (
			<div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
				<p className="text-white text-xl font-semibold animate-pulse">
					Loading...
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			{!user ? (
				<Hero />
			) : (
				<main className="container mx-auto py-4 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
					<div className="md:col-span-1">
						<SideBar
							notes={[...notes].sort((a, b) => b.updatedAt - a.updatedAt)}
							onSelectNote={setActiveNote}
							createNewNote={createNewNote}
							onDeleteNote={handleDeleteNote}
							activeNoteId={activeNote?.id}
						/>
					</div>
					<div className="md:col-span-2">
						{activeNote ? (
							<NoteEditor
								note={activeNote}
								onSave={async (updatedNote) => {
									const updated = {
										...updatedNote,
										updatedAt: Date.now(),
									};
									setNotes((prev) =>
										prev.map((n) => (n.id === updated.id ? updated : n))
									);
									setActiveNote(updated);
									await saveUserNote(user.uid, updated);
								}}
							/>
						) : (
							<EmptyState
								message="Create your first note to get started"
								buttonText="New Note"
								onButtonClick={createNewNote}
							/>
						)}
					</div>
				</main>
			)}
		</div>
	);
}
