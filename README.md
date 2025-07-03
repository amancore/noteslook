# Notes Look

A simple note-taking application built with **React** and **TypeScript**. This app allows users to create, edit, delete, and view notes, with automatic local storage persistence.

## Features

- 📌 **Create, Edit, and Delete Notes**
- 📜 **Auto-save notes to Local Storage**
- 🎨 **Responsive UI with modern styling**
- 🔍 **Scrollable list of notes**
- 🕒 **Timestamp display with AM/PM format**

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety and maintainability
- **ShadCN/UI** - Styled UI components
- **Lucide Icons** - Modern icons
- **Local Storage API** - Data persistence

## Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/amancore/notesLook.git
   cd notesLook
   ```

2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```

3. **Run the application**
   ```sh
   npm run dev  # or yarn dev
   ```

4. Open **http://localhost:3000** in your browser.

## File Structure

```
📂 src
 ┣ 📂 components
 ┃ ┣ 📜 NoteView.tsx         # Displays a selected note
 ┃ ┣ 📜 NoteEditor.tsx       # Note editing interface
 ┃ ┣ 📜 SideBar.tsx          # Sidebar with note list
 ┃ ┣ 📜 EmptyState.tsx       # Placeholder for empty notes
 ┣ 📂 lib
 ┃ ┣ 📜 storage.ts           # Handles local storage operations
 ┃ ┣ 📜 types.ts             # Type definitions for notes
 ┣ 📜 App.tsx                # Main application entry
 ┣ 📜 index.tsx              # React root render
```

## Local Storage

Notes are stored in the browser's local storage under the key **"notes"**. This ensures persistence across page reloads.

## Formatting Date & Time

The date and time of a note's creation are formatted using:
```ts
export function formatDate(timestamp: number): string {
	return new Date(timestamp).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}
```
This ensures timestamps appear in **"Mar 13, 2025, 5:45 PM"** format.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Added new feature"`).
4. Push to your fork and submit a pull request.

🚀 **Happy Coding!** 🎉

