export default class Utils {
  emailPattern: string;

  constructor() {
    this.emailPattern = '[a-zA-Z0-9_~-]+(?:\\.[a-zA-Z0-9_~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+';
  }
}
