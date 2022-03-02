import { v4 as uuid } from "uuid";
import AuditableEntity from "./auditableEntity";
export default class Reminder extends AuditableEntity {
  private readonly id: string;
  constructor(private name: string, private date: Date) {
    super();
    this.id = uuid();
  }
}
