
export class User {
    _id: string;
    emailId: string;
    password: string;
    status: string;
    details: UserDetails
    wrongPasswordCount: number;
    type: string;
}

export class UserDetails {
    name: string;
	address: string;
	contactNbr: string[];
    type: string;
  }

export class Vendor {
    _id: string;
    password: string;
    vendorId: string;
    emailId: string;
    status: string;
    details: VendorDetails;
    wrongPasswordCount: number;
}

export class VendorDetails {
    name: string;
 	address: string;
	contactNbr: string[];
}