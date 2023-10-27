import fs from "node:fs/promises";
import { get } from "node:http";
import { fileURLToPath } from "node:url";

const DB_PATH = fileURLToPath(new URL("../db.json", import.meta.url));

export const getDB = async () => {
  const data = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(data);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

const cleanDB = async () => {
  const db = { notes: [] };
  await saveDB(db);
};

export const insertDB = async (data) => {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return data;
};


