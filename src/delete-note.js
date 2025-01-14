import vscode from "./vscode-module.js";
import { deleteNote as deleteNoteInDB } from "./note-db.js";

export function deleteNote(noteNode) {
  deleteNoteInDB(noteNode.noteId);
  vscode.window.showInformationMessage(`delete note: ${noteNode.label}`);
}
