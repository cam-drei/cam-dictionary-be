export class EmailPayload {
  public to: string[];
  public subject: string;
  public text: string = '';
  public html: string = '';
}
