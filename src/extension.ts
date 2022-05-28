import * as vscode from "vscode";
import { RemindersProvider } from "./services/reminders-provider";
// Handlers
import getReminders from "./handlers/get-reminders.handler";
import createReminder from "./handlers/create-reminder.handler";
import { RemindersTreeDataProvider } from "./services/reminders-tree-data-provider";
import { RemindersCronJobFactory } from "./factory/reminder-cron-job-factory";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "code-remind" is now active!');
  wipeGlobalState(context); // Wipe global state, dev purpose
  startCronJob(context);

  RemindersProvider.init(context);

  const remindersTreeDataProvider = new RemindersTreeDataProvider();

  // Define commands
  const cmdCreateReminder = vscode.commands.registerCommand(
    "code-remind.createReminder",
    () => {
      createReminder(() => {
        remindersTreeDataProvider.refresh();
      });
    }
  );

  const cmdGetReminders = vscode.commands.registerCommand(
    "code-remind.getReminders",
    () => {
      getReminders();
    }
  );

  // Define Reminders tree view commands
  const cmdRefreshReminderTreeView = vscode.commands.registerCommand(
    "code-remind.refreshRemindersTreeView",
    () => {
      remindersTreeDataProvider.refresh();
    }
  );

  // Create views
  vscode.window.createTreeView("reminders", {
    treeDataProvider: remindersTreeDataProvider,
  });

  // Register commands
  pushSubscriptions(context, [
    cmdCreateReminder,
    cmdGetReminders,
    cmdRefreshReminderTreeView,
  ]);
}

function pushSubscriptions(
  context: vscode.ExtensionContext,
  subscriptions: Array<vscode.Disposable>
) {
  context.subscriptions.push(...subscriptions);
}

function startCronJob(context: vscode.ExtensionContext) {
  const remindersCronJob = new RemindersCronJobFactory()
    .withVscodeContext(context)
    .create();

  remindersCronJob.start();
}

/**
 *
 * @param context
 *
 * This is a utility function for dev purposes only.
 * It wipes the whole global state of the extension
 *
 */
function wipeGlobalState(context: vscode.ExtensionContext) {
  context.globalState.keys().forEach((key) => {
    context.globalState.update(key, undefined);
  });

  console.log("GLOBAL STATE WIPED");
}

export function deactivate() {}
