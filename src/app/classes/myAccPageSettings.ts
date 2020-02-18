export default class MyAccPageSettings {
  userInfoIsEditable?: boolean;
  passwordUpdateFieldIsEditable?: boolean;
  passwordIsUpdatedRecently?: boolean;
  emailUpdateFieldIsEditable?: boolean;
  emailFieldIsUpdatedRecently?: boolean;
  errorMessage?: string;

  constructor() {
      this.userInfoIsEditable = false;
      this.passwordUpdateFieldIsEditable = false;
      this.passwordIsUpdatedRecently = false;
      this.emailFieldIsUpdatedRecently = false;
      this.emailUpdateFieldIsEditable = false;
      this.errorMessage = '';
  }
}

export interface IPassFormValue {
  oldPassword: string;
  newPassword: string;
}

export interface IEmailFormValue {
  oldPassword: string;
  newEmail: string;
}
