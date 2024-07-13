import { IUser } from "./i-user";

export interface IEvent {
  id: number;

  title: string;
  eventDate: Date;
  dateTime: string;
  location: string;
  // tourPic
city:string;

  artistId:IUser;
}
