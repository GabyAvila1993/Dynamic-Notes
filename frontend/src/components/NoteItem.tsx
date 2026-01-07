import type { Note } from "../services/noteService";
import { deleteNote, toggleArchiveNote } from "../services/noteService";
import "../Styles/NoteItem.css";


interface NoteItemProps {
  note: Note;
  onDelete: () => void;
  onArchiveToggle: () => void;
  onEdit: () => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onDelete,
  onArchiveToggle,
  onEdit,
}) => {
  // Manejar la eliminación
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta nota?")) {
      try {
        await deleteNote(note.id);
        onDelete();
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar la nota");
      }
    }
  };

  // Manejar archivar/desarchivar
  const handleArchiveToggle = async () => {
    try {
      await toggleArchiveNote(note.id);
      onArchiveToggle();
    } catch (error) {
      console.error("Error al cambiar archivo:", error);
      alert("Error al cambiar el estado");
    }
  };

  return (
    <li className="note-item">
      <div className="note-content">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>

      <div className="note-actions">
        {/* Botón de editar */}
        <button className="btn-edit" onClick={onEdit} title="Editar">
          ✏️
        </button>

        {/* Botón de archivar/desarchivar */}
        <button
          className="btn-archive"
          onClick={handleArchiveToggle}
          title={note.archived ? "Desarchivar" : "Archivar"}
        >
          {note.archived ? "📂" : "📁"}
        </button>

        {/* Botón de eliminar */}
        <button className="btn-delete" onClick={handleDelete} title="Eliminar">
          🗑️
        </button>
      </div>
    </li>
  );
};
