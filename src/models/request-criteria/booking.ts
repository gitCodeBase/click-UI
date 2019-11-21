import { User } from './user';

export class Booking {
    id: string;
    itemId: string;
    itemName: string;
    userId: string;
    vendorId: string;
    bookingFromDate: Date;
    bookingToDate: Date;
    status: string;
    details: BookingDetails;
    createdOn: Date;
}


export class BookingDetails {
    bookedThrough: string;
    bookingFromTime: string;
    bookingToTime: string;
    amtCollected: number;
    taxCollected: DoubleRange;
    amtProcessedToVendor: boolean;
    amtProcessedToVendorThrough: string;
    amtProcessedToVendorOn: Date;
    type: string;
    place: string;
    qtyAvailable: number;
    userDetails: User; 
}

export class Notification {
    _id: string;
    vendorId: string;
    message: string;
    isRead: Boolean;
}