export interface IEvent {
likedByCurrentUser: any
likeCount: any
tourName:string
tourPic:string
eventDate:string
eventTime:string
city:string
region:string
country:string
venue:Venue
}
export interface Venue
{venueName:string
venueStreet: string
venueZip:string
venueCity:string
venueCountry:string
}
