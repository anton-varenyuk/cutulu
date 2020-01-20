import {ITask} from './ITask';

export interface IUserData {
  email: string;
  password: string;
  tasks: Array<ITask>;
}
