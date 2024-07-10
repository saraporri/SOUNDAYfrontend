export interface IUser {
  id: number;

  username: string;

  password: string;

  email: string;

  firstName: string;

  lastName: string;

  roles: string;

  followersCount: number;

  likeEvents: number;

  likeArtists: number;

  events: string[];

  partecipation: number;
}
