import AuditableEntity from "./auditableEntity";

export default class Reminder extends AuditableEntity {
  constructor(private name: string) {
    super();
  }
}
