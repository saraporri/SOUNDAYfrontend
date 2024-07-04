export interface IEvent {
id:string
tourName:string
tourPic:string
eventDate:string
eventTime:string
city:string
region:string
country:string
attendedCount: number
likedByCurrentUser: boolean
likeCount: number
venue:Venue
}
export interface Venue
{venueName:string
venueStreet: string
venueZip:string
venueCity:string
venueCountry:string
}
