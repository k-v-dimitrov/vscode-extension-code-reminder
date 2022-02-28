import * as vscode from "vscode";
import { RemindersProvider } from "./services/reminders-provider";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "code-remind" is now active!');

  const remindersProviderInstance = new RemindersProvider(context);

  const cmdSetReminder = vscode.commands.registerCommand(
    "code-remind.setReminder",
    () => {
      vscode.window.showInformationMessage(
        "This will set a new code reminder!"
      );
    }
  );

  const cmdGetReminders = vscode.commands.registerCommand(
    "code-remind.getReminders",
    () => {
      vscode.window.showInformationMessage(
        "Reminders: ",
        JSON.stringify(remindersProviderInstance.reminders, null, 4)
      );
    }
  );

  pushSubscriptions(context, [cmdSetReminder, cmdGetReminders]);
}

function pushSubscriptions(
  context: vscode.ExtensionContext,
  subscriptions: Array<vscode.Disposable>
) {
  context.subscriptions.push(...subscriptions);
}

export function deactivate() {}
