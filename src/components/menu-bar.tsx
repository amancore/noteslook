import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHeading,
	faParagraph,
	faBold,
	faItalic,
	faStrikethrough,
	faHighlighter,
	faAlignLeft,
	faAlignCenter,
	faAlignRight,
	faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

export default function MenuBar({ editor }) {
	if (!editor) {
		return null;
	}

	return (
		<div className="control-group">
			<div className="button-group">
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={
						editor.isActive("heading", { level: 1 }) ? "is-active" : ""
					}>
					<FontAwesomeIcon icon={faHeading} /> H1
				</button>
				<br />
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={
						editor.isActive("heading", { level: 2 }) ? "is-active" : ""
					}>
					<FontAwesomeIcon icon={faHeading} /> H2
				</button>
				<br />
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={
						editor.isActive("heading", { level: 3 }) ? "is-active" : ""
					}>
					<FontAwesomeIcon icon={faHeading} /> H3
				</button>
				<button
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={editor.isActive("paragraph") ? "is-active" : ""}>
					<FontAwesomeIcon icon={faParagraph} /> Paragraph
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive("bold") ? "is-active" : ""}>
					<FontAwesomeIcon icon={faBold} /> Bold
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive("italic") ? "is-active" : ""}>
					<FontAwesomeIcon icon={faItalic} /> Italic
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={editor.isActive("strike") ? "is-active" : ""}>
					<FontAwesomeIcon icon={faStrikethrough} /> Strike
				</button>
				<button
					onClick={() => editor.chain().focus().toggleHighlight().run()}
					className={editor.isActive("highlight") ? "is-active" : ""}>
					<FontAwesomeIcon icon={faHighlighter} /> Highlight
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}>
					<FontAwesomeIcon icon={faAlignLeft} /> Left
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					className={
						editor.isActive({ textAlign: "center" }) ? "is-active" : ""
					}>
					<FontAwesomeIcon icon={faAlignCenter} /> Center
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					className={
						editor.isActive({ textAlign: "right" }) ? "is-active" : ""
					}>
					<FontAwesomeIcon icon={faAlignRight} /> Right
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("justify").run()}
					className={
						editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
					}>
					<FontAwesomeIcon icon={faAlignJustify} /> Justify
				</button>
			</div>
		</div>
	);
}
