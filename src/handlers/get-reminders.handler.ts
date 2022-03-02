import RemindersProvider from "src/services/reminders-provider";
import { window } from "vscode";

export default function getReminders(remindersProvider: RemindersProvider) {
  window.showInformationMessage(
    "Reminders: ",
    JSON.stringify(remindersProvider.reminders, null, 4)
  );
}
