// Configuración de la URL base del API
const API_URL = "http://localhost:3000/notes";

// Interfaz para las notas
export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  category: string;
}

// Categorías disponibles
export const CATEGORIES = [
  "Work",
  "Personal",
  "Ideas",
  "Study",
  "Others"
] as const;

// Normalizar categorías al inglés (para notas antiguas)
export const normalizeCategoryToEnglish = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    "Trabajo": "Work",
    "Personal": "Personal",
    "Ideas": "Ideas",
    "Estudio": "Study",
    "Otros": "Others",
  };
  return categoryMap[category] || category;
};

// Crear una nueva nota
export const createNote = async (title: string, content: string, category: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, category }),
  });
  return response.json();
};

// Obtener todas las notas activas
export const getActiveNotes = async () => {
  const response = await fetch(`${API_URL}/active`);
  return response.json();
};

// Obtener todas las notas archivadas
export const getArchivedNotes = async () => {
  const response = await fetch(`${API_URL}/archived`);
  return response.json();
};

// Actualizar una nota
export const updateNote = async (
  id: number,
  title: string,
  content: string,
  category: string
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, category }),
  });
  return response.json();
};

// Eliminar una nota
export const deleteNote = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

// Archivar o desarchivar una nota
export const toggleArchiveNote = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}/archive`, {
    method: "PUT",
  });
  return response.json();
};

