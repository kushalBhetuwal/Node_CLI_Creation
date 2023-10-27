import { insertDB, saveDB, getDB } from "./db.js";

export const newNote = async (note, tags = []) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  insertDB(data);
  return data;
};

export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

export const findNotes = async (string) => {
  const notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(string.toLowerCase()),
  );
};

export const removeNotes = async (id) => {
  const data = await getAllNotes();
  const match = data.find((item) => item.id === id);
  if (match) {
    const arr = data.filter((item) => item.id !== id);
    await saveDB({ notes: arr });
    return arr;
  }
};

export const removeAllNotes = async () => {
  await saveDB({ notes: [] });
};
