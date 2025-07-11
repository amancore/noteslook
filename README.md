# 📝 NotesLook

A lightweight, elegant, and responsive **note-taking app** built with **React**, **TypeScript**, and **ShadCN UI**. NotesLook helps you capture your thoughts instantly, persistently, and securely — all stored locally in your browser.

---

## ✨ Features

- ✅ **Create, Edit, and Delete Notes**
- 💾 **Auto-save to Local Storage**
- 🧠 **Cursor and Scroll Memory** — remembers where you left off
- 📜 **Live Markdown Support** (with syntax highlighting via `remark-prism`)
- 🕐 **Readable Time Format** — AM/PM with month/day/year
- 🎨 **Modern UI with Dark Mode**
- 🔍 **Smart Sidebar Navigation**
- ⚡️ **Instant performance** — No backend required

---

## 🛠 Tech Stack

| Tech             | Purpose                          |
|------------------|----------------------------------|
| **React**        | UI Library                       |
| **TypeScript**   | Static typing & scalability      |
| **ShadCN/UI**    | Headless + styled UI components  |
| **Lucide Icons** | Icon system                      |
| **LocalStorage** | Client-side persistence          |
| **Next.js**      | Routing & Build system           |
| **Tailwind CSS** | Utility-first styling            |

---


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
📦 /src
 ┣ 📂 components
 ┃ ┣ 📜 NoteView.tsx        // Displays selected note
 ┃ ┣ 📜 NoteEditor.tsx      // Editor with cursor/scroll persistence
 ┃ ┣ 📜 SideBar.tsx         // Sidebar list of notes
 ┃ ┣ 📜 EmptyState.tsx      // No notes placeholder
 ┃ ┗ 📜 ui/                 // ShadCN UI elements
 ┣ 📂 lib
 ┃ ┣ 📜 storage.ts          // LocalStorage helpers
 ┃ ┗ 📜 types.ts            // Note type definitions
 ┣ 📜 App.tsx               // Main layout
 ┗ 📜 index.tsx             // App entry point
```

## 💾 Local Storage Behavior

Notes are persisted under the key: **`notes`**

Cursor and scroll positions are saved under:

- **`note_cursor_positions`**
- **`note_scroll_positions`**

> This allows you to continue exactly where you left off, even after a page reload or tab switch.

---

## 🕓 Date Formatting

All timestamps use U.S. readable format (e.g. `Mar 13, 2025, 5:45 PM`):

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

## 📌 Known Improvements To Add

- 🔍 **Search/filter notes** in sidebar  
- 🏷️ **Note tags or categories**  
- 🖥️ **Optional Markdown preview**  
- 📤 **Export notes** to `.txt` or `.md`


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Added new feature"`).
4. Push to your fork and submit a pull request.

🚀 **Happy Coding!** 🎉

