export const listNotes = (notes) => {
  notes.forEach((note) => {
    console.log("\n");
    console.log("tags:", note.tags);
    console.log("content:", note.content);
    console.log("id:", note.id);
  });
};
