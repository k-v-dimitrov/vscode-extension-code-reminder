export default abstract class AuditableEntity {
  private createdAt: Date;
  protected constructor() {
    this.createdAt = new Date();
  }
}
