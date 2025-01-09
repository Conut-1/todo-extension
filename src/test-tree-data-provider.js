import vscode from "./vscode-module.js";
import { getNotes } from "./note-db.js";

/**
 * @implements {vscode.TreeDataProvider}
 */
export class TestTreeDataProvider {
  /**
   * @param {vscode.ExtensionContext} context
   */
  constructor(context) {
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.context = context;
  }

  /**
   * @returns {vscode.TreeItem}
   */
  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!element) {
      const notes = getNotes(vscode.workspace.workspaceFolders[0].uri.fsPath);
      return notes.map((note) => {
        return new vscode.TreeItem(note.note);
      });
    }
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
}
