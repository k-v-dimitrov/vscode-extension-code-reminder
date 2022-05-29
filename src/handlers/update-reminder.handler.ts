import { RemindersProvider } from "../services/reminders-provider";
import Reminder from "../models/reminder";

import { globalEvents } from "../extension";

export default function updateReminder(
  id: string,
  propsToUpdate: Partial<Reminder>
) {
  const remindersProviderInstance = RemindersProvider.getInstance();
  const currentReminder = remindersProviderInstance.getReminder(id);

  if (!currentReminder) {
    throw new Error(`Trying to update non-existing reminder with id: ${id}`);
  }

  RemindersProvider.getInstance().saveReminder({
    ...currentReminder,
    ...propsToUpdate,
  });

  globalEvents.emit("refresh-tree-data");
}
