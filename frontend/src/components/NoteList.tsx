import { useEffect, useState } from "react";
import type { Note } from "../services/noteService";
import { getActiveNotes, getArchivedNotes, CATEGORIES } from "../services/noteService";
import { NoteForm } from "./NoteForm";
import { NoteItem } from "./NoteItem";
import "../Styles/NoteList.css";

export const NoteList: React.FC = () => {
  // States
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [currentTab, setCurrentTab] = useState<"active" | "archived">("active");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showForm, setShowForm] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  // Load notes when component mounts or updates
  const loadNotes = async () => {
    setLoading(true);
    try {
      const active = await getActiveNotes();
      const archived = await getArchivedNotes();
      setActiveNotes(active);
      setArchivedNotes(archived);
    } catch (error) {
      console.error("Error loading notes:", error);
      alert("Error loading notes");
    } finally {
      setLoading(false);
    }
  };

  // Load notes on component mount
  useEffect(() => {
    loadNotes();
  }, []);

  // When a note is added, reload
  const handleNoteAdded = () => {
    loadNotes();
    setNoteToEdit(null);
    setShowForm(false);
  };

  // When edit is complete, reload
  const handleEditComplete = () => {
    loadNotes();
    setNoteToEdit(null);
  };

  // When a note is deleted, reload
  const handleNoteDeleted = () => {
    loadNotes();
  };

  // When archive status changes, reload
  const handleArchiveToggle = () => {
    loadNotes();
  };

  // Notes to display (active or archived depending on tab)
  let notesToShow = currentTab === "active" ? activeNotes : archivedNotes;

  // Filter by category if one is selected
  if (selectedCategory) {
    notesToShow = notesToShow.filter((note) => note.category === selectedCategory);
  }

  return (
    <div className="notes-page">
      {/* New note form or edit */}
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

      {/* Title and controls section */}
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

      {/* Tabs to switch between active and archived */}
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

      {/* Category filters */}
      <div className="category-filters">
        <button
          className={`category-menu-toggle`}
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          title="Filter by category"
        >
          ☰ Categories
        </button>
        <div className={`category-buttons ${showCategoryMenu ? "open" : ""}`}>
          <button
            className={`category-btn ${selectedCategory === null ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory(null);
              setShowCategoryMenu(false);
            }}
          >
            All ({currentTab === "active" ? activeNotes.length : archivedNotes.length})
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

      {/* Notes list/grid */}
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

