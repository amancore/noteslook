import { Note } from "./types";
// Dynamic key based on user
const getStorageKey = (uid: string) => `notes_${uid}`;

// Load notes for specific user
export function loadNotes(uid: string): Note[] {
	if (typeof window === "undefined") return [];

	const savedNotes = localStorage.getItem(getStorageKey(uid));
	if (savedNotes) {
		try {
			return JSON.parse(savedNotes);
		} catch (error) {
			console.error("Failed to parse notes from localStorage", error);
			return [];
		}
	}
	return [];
}

// Save notes for specific user
export function saveNotes(uid: string, notes: Note[]): void {
	if (typeof window === "undefined") return;
	localStorage.setItem(getStorageKey(uid), JSON.stringify(notes));
}

// Date formatting remains unchanged
export function formateDate(timestamp: number): string {
	return new Date(timestamp).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}
