import Database from "better-sqlite3";

let db = null;

export function initDB() {
  if (db) return;
  db = new Database("todo-note.db", { verbose: console.log });

  db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      note TEXT NOT NULL
    );
  `);
}

export function closeDB() {
  if (db) db.close();
  db = null;
}
