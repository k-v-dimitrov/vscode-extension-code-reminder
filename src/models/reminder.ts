import { v4 as uuid } from "uuid";
import AuditableEntity from "./auditableEntity";

export interface IReminder {
  id: string;
  name: string;
  date: Date;
  reminderLine: number;
  reminderFileLocation: string;
}

interface Reminder extends IReminder {}
class Reminder extends AuditableEntity {
  constructor(props: Omit<IReminder, "id">) {
    super();
    this.id = uuid();
  }
}

export default Reminder;
