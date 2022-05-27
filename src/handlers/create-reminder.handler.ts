import * as vscode from "vscode";
import { RemindersProvider } from "../services/reminders-provider";
import * as path from "path";
import * as fs from "fs";
import ReminderFactory from "../factory/reminder-factory";
import Reminder from "models/reminder";

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

  const html = buildCreateReminderPage();
  const panel = createVSWebViewPanel();
  panel.webview.html = html;

  panel.webview.onDidReceiveMessage((payload: FormPayload) => {
    const filename = activeTextEditor?.document.fileName;
    const reminderLine = activeTextEditor?.selection.start.line;

    const reminder = buildReminder(payload, filename, reminderLine);
    saveReminder(reminder);
    panel.dispose();
    callback();
  });
}

function createVSWebViewPanel() {
  return vscode.window.createWebviewPanel(
    "create_reminder",
    "Create reminder",
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
      enableForms: true,
    }
  );
}

function saveReminder(reminder: Reminder) {
  RemindersProvider.getInstance().saveReminder(reminder);
}

function buildReminder(
  payload: FormPayload,
  filename: string,
  reminderLine: number
) {
  const reminderFactory = new ReminderFactory();
  const reminder = reminderFactory
    .withName(payload.name)
    .withReminderDate(new Date(payload.date))
    .withFileLocation(filename)
    .withLineNumber(reminderLine)
    .create();
  return reminder;
}

function buildCreateReminderPage() {
  const htmlPath = path.join(__dirname, "views", "create-reminder.html");
  const html = fs.readFileSync(htmlPath, "utf-8");

  const cssPath = path.join(__dirname, "views", "vscode.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  const styledHTML = html.replace("/* ADD_CSS */", css);
  return styledHTML;
}
