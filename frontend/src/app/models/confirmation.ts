export class Confirmation {
  public title: string;
  public message: string;
  public confirmText: string;
  public cancelText: string;

  constructor({
    title = "Confirm",
    message = "Are you sure you want to perform this action?",
    confirmText = "Confirm",
    cancelText = "Cancel"
  }: Partial<Confirmation> = {}) {
    this.title = title;
    this.message = message;
    this.confirmText = confirmText;
    this.cancelText = cancelText;
  }
}
