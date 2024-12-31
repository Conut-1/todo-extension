import vscode from "./vscode-module.js";

export class TestTreeDataProvider {
  getTreeItem(element) {
    return element;
  }

  getChildren(element) {
    if (!element) {
      return [
        new vscode.TreeItem(
          "Parent 1",
          vscode.TreeItemCollapsibleState.Collapsed
        ),
        new vscode.TreeItem(
          "Parent 2",
          vscode.TreeItemCollapsibleState.Collapsed
        ),
      ];
    } else if (element.label === "Parent 1") {
      return [
        new vscode.TreeItem("Child 1-1"),
        new vscode.TreeItem("Child 1-2"),
      ];
    } else if (element.label === "Parent 2") {
      return [
        new vscode.TreeItem("Child 2-1"),
        new vscode.TreeItem("Child 2-2"),
      ];
    }
    return [];
  }
}
