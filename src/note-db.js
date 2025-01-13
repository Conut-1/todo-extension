import Database from "better-sqlite3";
import { join } from "path";
import vscode from "./vscode-module.js";

/**
 * @typedef {Object} Note
 * @property {number} id
 * @property {string} path
 * @property {string} note
 */

/**
 * @type {Database.Database}
 */
let db = null;

/**
 * @param {vscode.Uri} dbUri
 */
export async function initDB(dbUri) {
  await vscode.workspace.fs.createDirectory(dbUri);
  if (db) return;
  db = new Database(join(dbUri.fsPath, "todo-note.db"), {
    verbose: console.log,
  });

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

/**
 * @param {string} path
 * @returns {Note[]}
 */
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

export function deleteNote(noteId) {
  const deleteNoteStmt = db.prepare(`
    DELETE FROM notes WHERE id = ?
  `);
  deleteNoteStmt.run(noteId);
}
