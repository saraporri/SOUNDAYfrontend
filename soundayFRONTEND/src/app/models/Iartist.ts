import { Iroles } from "./iroles";

export interface Artist {
  username: string;

  password: string;

  email: string;

  firstName: string;

  lastName: string;
  roles:Iroles[];
}
