import { Iroles } from "./iroles";

export interface IUser {
  id: number;

  username: string;

  password: string;

  email: string;

  firstName: string;

  lastName: string;

  roles: Iroles[];

  followersCount: number;

  likeEvents: number[];

  likeArtists: number;

  events: string[];

  partecipation: number;
}
