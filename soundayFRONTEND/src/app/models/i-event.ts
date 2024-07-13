import { IUser } from './i-user';
import { CountsAndLike } from './counts-and-like';

export interface IEvent extends CountsAndLike{
  id: number;

  title: string;
  eventDate: Date;
  dateTime: string;
  location: string;
  // tourPic
city:string;

  artistId:IUser;
}
