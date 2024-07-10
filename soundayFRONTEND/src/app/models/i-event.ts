export interface IEvent {
  likedByCurrentUser: boolean;
  id: number;

  title: string;
  eventDate: Date;
  dateTime: Date;
  location: string;
  // tourPic
city:string;
  participantsCount: number;
  likesCount: number;

}
