import Reminder from "../models/reminder";
import { IReminder } from "../models/reminder";

interface ReminderFactory extends IReminder {}
class ReminderFactory {
  withName(name: string) {
    this.name = name;
    return this;
  }

  withReminderDate(date: Date) {
    this.date = new Date(date);
    return this;
  }

  withFileLocation(fileLocation: string) {
    this.reminderFileLocation = fileLocation;
    return this;
  }

  withLineNumber(line: number) {
    this.reminderLine = line;
    return this;
  }

  withWasNotificationShown(wasNotificationShown: boolean) {
    this.wasNotificationShown = wasNotificationShown;
    return this;
  }

  fromJSON(json: string): ReminderFactory {
    const parsedJSON = JSON.parse(json);
    return Object.assign(this, { ...parsedJSON });
  }

  fromObject(serializableObject: Reminder) {
    try {
      if (Reminder.isReminder(serializableObject)) {
        const reminderObject = serializableObject as Reminder;
        return Object.assign(this, {
          ...reminderObject,
          date: new Date(reminderObject.date),
        });
      }

      throw new Error(
        "fromObject() in Reminder Factory received object that was not an instance of Reminder object"
      );
    } catch (error) {
      console.error(error);

      return Object.assign(this, {
        date: new Date(),
        name: "CORRUPTED",
        reminderFileLocation: "CORRUPTED",
        reminderLine: -1,
      });
    }
  }

  create() {
    if (!this.name) {
      throw new Error("Cannot create Reminder without name");
    }

    if (!this.date) {
      throw new Error("Cannot create Reminder without date");
    }

    if (!this.reminderFileLocation) {
      throw new Error("Cannot create Reminder without filename");
    }

    if (typeof this.reminderLine === "undefined") {
      throw new Error("Cannot create Reminder without selected line");
    }

    return new Reminder({
      id: this.id || "",
      name: this.name,
      date: this.date,
      reminderFileLocation: this.reminderFileLocation,
      reminderLine: this.reminderLine,
      completed: false,
      createdAt: this.createdAt,
      wasNotificationShown: this.wasNotificationShown,
    });
  }
}

export default ReminderFactory;
