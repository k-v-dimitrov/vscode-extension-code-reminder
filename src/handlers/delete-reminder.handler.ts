import { RemindersProvider } from "../services/reminders-provider";
import { globalEvents } from "../extension";

export default function deleteReminder(id: string) {
  RemindersProvider.getInstance().deleteReminderById(id);
  globalEvents.emit("refresh-tree-data");
}
