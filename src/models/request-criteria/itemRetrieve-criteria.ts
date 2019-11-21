export class Reviews {
    userName: string;
    rating: number;
    heading: string;
    comments: string;
    date: String;
    status: string;
}

export class Amenities {
    amenity1: string;
    amenity2: string;
    amenity3: string;
    amenity4: string;
    amenity5: string;
    amenity6: string;
}

export class ItemDetails {
    name: string;
    address: string;
    place: string;
    contactNum: String[];
    mailId: string;
    amenities: Amenities;
    mainImageUrl: string;
    description: string;
    qtyAvailable: number;
}

export class Pricing {
    baseRate: number;
    tax: number;
    discount: number;
    subTotal: number;
    otherDiscount: number;
}

export class FilterDetails {
    seatingCapcity: string;
    tempControl: string;
    amount: number;
}

export class Item {
    _id: string;
    vendorId: string;
    placeId: string;
    type: string;
    details: ItemDetails;
    price: Pricing;
    filter: FilterDetails;
    reviews: Reviews[]
    status: string;
    //dateSelected: Date;
    fromDate: Date;
    toDate: Date;
    images: Image[];
}

export class Image {
    fileName: string;
}
