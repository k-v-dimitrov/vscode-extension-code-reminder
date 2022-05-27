import { RemindersProvider } from "../services/reminders-provider";
import { window } from "vscode";

export default function getReminders() {
  window.showInformationMessage(
    "Reminders: ",
    JSON.stringify(RemindersProvider.getInstance().reminders, null, 4)
  );
}
