import { relative } from "path";
import vscode from "./vscode-module.js";
import { getNotes } from "./note-db.js";

/**
 * @implements {vscode.TreeDataProvider}
 */
export class NoteTreeDataProvider {
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
      return makeTree();
    }
    return element.children;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
}

function makeTree() {
  const notes = getNotes(vscode.workspace.workspaceFolders[0].uri.fsPath);
  const groupedNotes = notes.reduce((groupedNotes, note) => {
    const key = note.path;
    if (!groupedNotes[key]) {
      groupedNotes[key] = [];
    }
    groupedNotes[key].push(note);
    return groupedNotes;
  }, {});
  return Object.keys(groupedNotes).map((path) => {
    const fileNode = new FileNode(path);
    groupedNotes[path].forEach((note) => {
      fileNode.children.push(new NoteNode(note));
    });
    return fileNode;
  });
}

class FileNode extends vscode.TreeItem {
  /**
   * @param {string} filePath
   */
  constructor(filePath) {
    super(vscode.Uri.file(filePath), vscode.TreeItemCollapsibleState.Expanded);
    this.children = [];
    this.tooltip = filePath;
    this.label = relative(
      vscode.workspace.workspaceFolders[0].uri.fsPath,
      filePath
    );
    this.iconPath = vscode.ThemeIcon.File;
  }
}

class NoteNode extends vscode.TreeItem {
  /**
   * @param {import("./note-db.js").Note} note
   */
  constructor(note) {
    super(note.note);
    this.noteId = note.id;
    this.contextValue = "note";
    this.command = {
      title: "move to note",
      command: "vscode.open",
      arguments: [
        vscode.Uri.from({ path: note.path }),
        { selection: new vscode.Range(note.line, 0, note.line, 0) },
      ],
    };
  }
}
