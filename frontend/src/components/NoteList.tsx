import { useEffect, useState } from "react";
import "./../style/note.css";

interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
}

export const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/notes/active")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div className="notes-container">
      <h2>Notas Activas</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id} className="note-item">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
