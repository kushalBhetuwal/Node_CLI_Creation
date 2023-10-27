import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNotes } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});
test("creating a new note", async () => {
  const note = "happy dashain";
  const tags = ["dashain", "tihar"];

  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  insertDB.mockResolvedValue(data);
  const result = await newNote(note, tags);
  expect(result).toEqual(data);
});

test("getting all the notes", async () => {
  const data = {
    notes: ["test1", "test2"],
  };
  getDB.mockResolvedValue(data);
  const result = await getAllNotes();
  expect(result).toEqual(data.notes);
});

test("removing notes by id when id matches an existing note", async () => {
  const db = {
    notes: [
      { id: 1, content: "hello brother" },
      { id: 2, content: "hello kushal" },
    ],
  };
  saveDB.mockResolvedValue(db);
  const idtoremove = 2; // just know that this 2 is not equal to anything in the database because the newnote creates a new id everytime
  const result = await removeNotes(idtoremove);
  expect(result).toBeUndefined();
});
