'use client'
import SideBar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { useState,useEffect } from "react";
import { Note } from "@/lib/types";
import NoteView from "@/components/view";
import NoteEditor from "@/components/editor";
import EmptyState from "@/components/empty-state";
import { loadNotes, saveNotes } from "@/lib/storage";
export default function Home() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [activeNote,setActiveNote] = useState<Note | null>(null);
	const [isEditing, setIsEditing] = useState(true);

	useEffect(() => {
		setNotes(loadNotes());
	}, []);

	useEffect(() => {
		saveNotes(notes);
	}, [notes]);
	
	const createNewNote = () => {
		const newNote: Note = {
			id:Date.now().toString(),
			title: 'New Note',
			content : "",
			createdAt: Date.now()
		}
		setNotes([newNote, ...notes]);
		setActiveNote(newNote);
		setIsEditing(true);
	};
	const selectNote = (note: Note) => {
		setActiveNote(note);
		setIsEditing(false);
	}
	const cancelEdit = () => {
		setIsEditing(false);
	}
	const saveNote = (updatedNote : Note) => {
		setNotes(notes.map(note => (note.id === updatedNote.id) ? updatedNote : note));
		setActiveNote(updatedNote);
		setIsEditing(false);
	}
	const deleteNote = (id :string ) => {
		setNotes(notes.filter((note) => note.id !== id));
		if(activeNote && activeNote.id === id){
			setActiveNote(null);
			setIsEditing(false);
		}
	}
	const renderNoteContent = () => {
		if (!activeNote && notes.length === 0) {
			return (
				<EmptyState message="Create your first note to get started"
				 buttonText="New Note"
				 onButtonClick={createNewNote}
				/>
			)
		}
		if(activeNote && isEditing){
			return <NoteEditor note={activeNote} onSave={saveNote} onCancel={cancelEdit}/>
		}
		if (activeNote) {
			return <NoteView note={activeNote} onEdit={()=>{setIsEditing(true)}}/>;
		}
		return null;
	}
	return (
		<div className="flex flex-col min-h-screen">
			<Header onNewNote={createNewNote} />
			<main className="container mx-auto p-4 grid grid-col-2 md:grid-cols-3 gap-6 flex-1">
				<div className="md:col-span-1">
					<SideBar
						notes={notes}
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
