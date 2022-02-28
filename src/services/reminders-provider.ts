import * as vscode from "vscode";
export class RemindersProvider {
  constructor(private readonly context: vscode.ExtensionContext) {
    context.globalState.keys();
  }

  get reminders() {
    return this.context.globalState.keys().map((key) => {
      return this.context.globalState.get(key);
    });
  }
}
