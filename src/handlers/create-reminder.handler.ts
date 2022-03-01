import * as vscode from "vscode";
import { RemindersProvider } from "src/services/reminders-provider";
import * as path from "path";
import * as fs from "fs";

export default function createReminder(remindersProvider: RemindersProvider) {
  const panel = vscode.window.createWebviewPanel(
    "create_reminder", // Identifies the type of the webview. Used internally
    "Create reminder", // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    {
      enableScripts: true,
      enableForms: true,
    } // Webview options. More on these later.
  );

  const htmlPath = path.join(__dirname, "views", "create-reminder.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  panel.webview.html = html;
}
