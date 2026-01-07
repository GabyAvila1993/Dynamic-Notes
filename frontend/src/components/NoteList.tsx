import { useEffect, useState } from "react";
import type { Note } from "../services/noteService";
import { getActiveNotes, getArchivedNotes, CATEGORIES } from "../services/noteService";
import { NoteForm } from "./NoteForm";
import { NoteItem } from "./NoteItem";
import "../Styles/NoteList.css";

export const NoteList: React.FC = () => {
  // Estados
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [currentTab, setCurrentTab] = useState<"active" | "archived">("active");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showForm, setShowForm] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  // Cargar las notas cuando el componente se monta o cuando se actualiza
  const loadNotes = async () => {
    setLoading(true);
    try {
      const active = await getActiveNotes();
      const archived = await getArchivedNotes();
      setActiveNotes(active);
      setArchivedNotes(archived);
    } catch (error) {
      console.error("Error al cargar notas:", error);
      alert("Error al cargar las notas");
    } finally {
      setLoading(false);
    }
  };

  // Cargar notas al montar el componente
  useEffect(() => {
    loadNotes();
  }, []);

  // Cuando se añade una nota, recargar
  const handleNoteAdded = () => {
    loadNotes();
    setNoteToEdit(null);
    setShowForm(false);
  };

  // Cuando se completa la edición, recargar
  const handleEditComplete = () => {
    loadNotes();
    setNoteToEdit(null);
  };

  // Cuando se elimina una nota, recargar
  const handleNoteDeleted = () => {
    loadNotes();
  };

  // Cuando se cambia el archivo, recargar
  const handleArchiveToggle = () => {
    loadNotes();
  };

  // Notas que se muestran (activas o archivadas según la pestaña)
  let notesToShow = currentTab === "active" ? activeNotes : archivedNotes;

  // Filtrar por categoría si hay una seleccionada
  if (selectedCategory) {
    notesToShow = notesToShow.filter((note) => note.category === selectedCategory);
  }

  return (
    <div className="notes-page">
      {/* Formulario de nueva nota o edición */}
      {showForm && !noteToEdit && (
        <NoteForm onNoteAdded={handleNoteAdded} onClose={() => setShowForm(false)} />
      )}

      {noteToEdit && (
        <>
          <NoteForm
            onNoteAdded={handleNoteAdded}
            noteToEdit={noteToEdit}
            onEditComplete={handleEditComplete}
            onClose={() => setNoteToEdit(null)}
          />
          {/* <button
            className="btn-cancel"
            onClick={() => setNoteToEdit(null)}
          >
            Cancelar edición
          </button> */}
        </>
      )}

      {/* Sección de título y controles */}
      <div className="notes-header">
        <div className="notes-header-left">
          <h2 className="notes-title">
            {currentTab === "active" ? "Active Notes" : "Archived Notes"}
          </h2>
          <p className="notes-subtitle">
            {currentTab === "active"
              ? "Manage and organize your notes"
              : "View your archived notes"}
          </p>
        </div>

        <div className="notes-header-right">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              ⊞ Grid
            </button>
            <button
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              ☰ List
            </button>
          </div>

          <button
            className="btn-new-note"
            onClick={() => setShowForm(!showForm)}
          >
            + New Note
          </button>
        </div>
      </div>

      {/* Pestañas para cambiar entre activas y archivadas */}
      <div className="tabs">
        <button
          className={`tab ${currentTab === "active" ? "active" : ""}`}
          onClick={() => {
            setCurrentTab("active");
            setSelectedCategory(null);
          }}
        >
          📝 Active ({activeNotes.length})
        </button>
        <button
          className={`tab ${currentTab === "archived" ? "active" : ""}`}
          onClick={() => {
            setCurrentTab("archived");
            setSelectedCategory(null);
          }}
        >
          📂 Archived ({archivedNotes.length})
        </button>
      </div>

      {/* Filtros de categorías */}
      <div className="category-filters">
        <button
          className="category-menu-toggle"
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          title="Filtrar por categoría"
        >
          ☰ Categorías
        </button>
        <div className={`category-buttons ${showCategoryMenu ? "open" : ""}`}>
          <button
            className={`category-btn ${selectedCategory === null ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(null);
              setShowCategoryMenu(false);
            }}
          >
            Todas ({currentTab === "active" ? activeNotes.length : archivedNotes.length})
          </button>
          {CATEGORIES.map((category) => {
            const count = (currentTab === "active" ? activeNotes : archivedNotes).filter(
              (note) => note.category === category
            ).length;
            return (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategoryMenu(false);
                }}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista/Grid de notas */}
      <div className={`notes-container ${viewMode}`}>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : notesToShow.length === 0 ? (
          <p className="empty-message">
            {selectedCategory
              ? `No notes in ${selectedCategory} category`
              : currentTab === "active"
              ? "No active notes"
              : "No archived notes"}
          </p>
        ) : (
          <ul className={`notes-${viewMode}`}>
            {notesToShow.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleNoteDeleted}
                onArchiveToggle={handleArchiveToggle}
                onEdit={() => {
                  setNoteToEdit(note);
                  setShowForm(false);
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

