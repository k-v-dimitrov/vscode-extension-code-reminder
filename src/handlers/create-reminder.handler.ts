import * as vscode from "vscode";

export default function createReminder() {
  const panel = vscode.window.createWebviewPanel(
    "catCoding", // Identifies the type of the webview. Used internally
    "Cat Coding", // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    {} // Webview options. More on these later.
  );
}
