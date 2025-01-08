import Database from "better-sqlite3";

/**
 * @type {Database.Database}
 */
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

export function getNotes(path) {
  const getNotesStmt = db.prepare(`
    SELECT * FROM notes WHERE path LIKE ?;
  `);
  const notes = getNotesStmt.all(`${path}%`);
  return notes;
}

export function insertNote(filePath, note) {
  const insertNoteStmt = db.prepare(`
    INSERT INTO notes (path, note) VALUES (?, ?)
  `);
  insertNoteStmt.run(filePath, note);
}
