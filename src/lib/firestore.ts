import { firestore } from "./firebase";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	deleteDoc,
	where,
} from "firebase/firestore";
import { Note } from "./types";

export async function getUserNotes(uid: string): Promise<Note[]> {
	const q = query(collection(firestore, "notes"), where("uid", "==", uid));
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => doc.data() as Note);
}

export async function saveUserNote(uid: string, note: Note): Promise<void> {
	await setDoc(doc(firestore, "notes", note.id), {
		...note,
		uid,
	});
}

export async function deleteUserNote(id: string): Promise<void> {
	await deleteDoc(doc(firestore, "notes", id));
}
