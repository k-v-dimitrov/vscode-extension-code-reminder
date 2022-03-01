import * as vscode from "vscode";
import { RemindersProvider } from "src/services/reminders-provider";
import * as path from "path";
import * as fs from "fs";

export default function createReminder(remindersProvider: RemindersProvider) {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (!activeTextEditor) {
    vscode.window.showInformationMessage(
      "Cannot create task when no file is opened..."
    );
    return;
  }

  const isUntitled = activeTextEditor.document.isUntitled;

  if (isUntitled) {
    vscode.window.showInformationMessage(
      "Cannot set reminders on untitled files..."
    );
    return;
  }

  console.log(activeTextEditor);
  const filename = activeTextEditor?.document.fileName;
  const reminderLine = activeTextEditor?.selection.start.line;

  const panel = vscode.window.createWebviewPanel(
    "create_reminder", // Identifies the type of the webview. Used internally
    "Create reminder", // Title of the panel displayed to the user
    vscode.ViewColumn.Beside, // Editor column to show the new webview panel in.
    {
      enableScripts: true,
      enableForms: true,
    } // Webview options. More on these later.
  );

  const htmlPath = path.join(__dirname, "views", "create-reminder.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  panel.webview.html = html;

  panel.webview.onDidReceiveMessage((message) => {});
}
