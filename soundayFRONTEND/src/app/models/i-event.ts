import { IUser } from "./i-user";

export interface IEvent {
  id: number;

  title: string;
  eventDate: Date;
  dateTime: Date;
  location: string;
  // tourPic
city:string;

  artistId?:IUser
}
