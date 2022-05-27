import * as vscode from "vscode";
import { RemindersProvider } from "../services/reminders-provider";
import * as path from "path";
import * as fs from "fs";
import ReminderFactory from "../factory/reminder-factory";

interface FormPayload {
  name: string;
  date: string;
}

export default function createReminder(callback: () => void) {
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

  const cssPath = path.join(__dirname, "views", "vscode.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  const styledHTML = html.replace("/* ADD_CSS */", css);

  panel.webview.html = styledHTML;

  panel.webview.onDidReceiveMessage((payload: FormPayload) => {
    const reminderFactory = new ReminderFactory();
    const reminder = reminderFactory
      .withName(payload.name)
      .withReminderDate(new Date(payload.date))
      .withFileLocation(filename)
      .withLineNumber(reminderLine)
      .create();

    RemindersProvider.getInstance().saveReminder(reminder);
    panel.dispose();
    callback();
  });
}
