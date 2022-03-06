export default abstract class AuditableEntity {
  protected createdAt: Date;
  protected constructor() {
    this.createdAt = new Date();
  }
}
