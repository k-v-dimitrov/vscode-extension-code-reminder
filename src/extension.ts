import * as vscode from "vscode";
import { RemindersProvider } from "./services/reminders-provider";
// Handlers
import getReminders from "./handlers/get-reminders.handler";
import createReminder from "./handlers/create-reminder.handler";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "code-remind" is now active!');

  const remindersProviderInstance = new RemindersProvider(context);

  const cmdCreateReminder = vscode.commands.registerCommand(
    "code-remind.createReminder",
    () => {
      createReminder(remindersProviderInstance);
    }
  );

  const cmdGetReminders = vscode.commands.registerCommand(
    "code-remind.getReminders",
    () => getReminders(remindersProviderInstance)
  );

  pushSubscriptions(context, [cmdCreateReminder, cmdGetReminders]);
}

function pushSubscriptions(
  context: vscode.ExtensionContext,
  subscriptions: Array<vscode.Disposable>
) {
  context.subscriptions.push(...subscriptions);
}

export function deactivate() {}
