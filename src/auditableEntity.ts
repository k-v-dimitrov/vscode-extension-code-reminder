export default abstract class AuditableEntity {
  private createdAt: Date;
  private updatedAt: Date | null;
  protected constructor() {
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}
