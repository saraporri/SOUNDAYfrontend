import { Iroles } from "./iroles";

export interface Iregister {

  username: string;

  password: string;

  email: string;

  firstName: string;

  lastName: string;
  roles:Iroles[];
}
