import { useState } from "react";
import type { Note } from "../services/noteService";
import { createNote, updateNote, CATEGORIES } from "../services/noteService";
import "../Styles/NoteForm.css";


interface NoteFormProps {
  onNoteAdded: () => void;
  noteToEdit?: Note | null;
  onEditComplete?: () => void;
  onClose?: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  onNoteAdded,
  noteToEdit,
  onEditComplete,
  onClose,
}) => {
  // Estados para el formulario
  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [content, setContent] = useState(noteToEdit?.content || "");
  const [category, setCategory] = useState(noteToEdit?.category || "Others");
  const [loading, setLoading] = useState(false);

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que no estén vacíos
    if (!title.trim() || !content.trim()) {
      alert("Por favor rellena el título y el contenido");
      return;
    }

    setLoading(true);

    try {
      if (noteToEdit) {
        // Si estamos editando, actualizar
        await updateNote(noteToEdit.id, title, content, category);
        alert("¡Nota actualizada!");
        if (onEditComplete) {
          onEditComplete();
        }
      } else {
        // Si es nueva, crear
        await createNote(title, content, category);
        alert("¡Nota creada!");
      }

      // Limpiar el formulario
      setTitle("");
      setContent("");
      setCategory("Others");

      // Notificar al componente padre que se añadió una nota
      onNoteAdded();
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="note-form" onClick={(e) => e.stopPropagation()}>
        <div className="note-form-header">
          <h2>{noteToEdit ? "Editar nota" : "Nueva nota"}</h2>
          <button 
            className="btn-close" 
            onClick={onClose}
            type="button"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Campo de título */}
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              placeholder="Escribe el título de la nota"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Campo de contenido */}
          <div className="form-group">
            <label htmlFor="content">Contenido</label>
            <textarea
              id="content"
              placeholder="Escribe el contenido de la nota"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              rows={5}
            />
          </div>

          {/* Campo de categoría */}
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de envío */}
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : noteToEdit ? "Actualizar" : "Crear nota"}
          </button>
        </form>
      </div>
    </div>
  );
};

