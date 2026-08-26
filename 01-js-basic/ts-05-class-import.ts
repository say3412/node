export interface User {
  name: string;
  age: number;
}

export class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }
  getUsers(): User[] {
    return this.users;
  }
}

import {User as U2, UserService as US2} from './ts-05-class-import';
const us1 = new US2();
const u1: U2 = {
  name: "lala", age: 35
}

us1.addUser(u1);
console.log("users: ", us1.getUsers());