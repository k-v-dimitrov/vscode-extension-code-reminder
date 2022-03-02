import Reminder from "../reminder";
import * as vscode from "vscode";
export default class RemindersProvider {
  constructor(private readonly context: vscode.ExtensionContext) {
    context.globalState.keys();
  }

  get reminders() {
    return this.context.globalState.keys().map((key) => {
      return this.context.globalState.get(key);
    });
  }

  saveReminder(reminder: Reminder) {
    console.log(JSON.stringify(reminder, null, 4));

    this.context.globalState.update(reminder.id, reminder);
  }
}
