import { v4 as uuid } from "uuid";
import AuditableEntity from "./auditableEntity";
export default class Reminder extends AuditableEntity {
  readonly id: string;

  constructor(
    private name: string,
    private date: Date,
    private reminderLine: number,
    private reminderFileLocation: string
  ) {
    super();
    this.id = uuid();
  }
}
