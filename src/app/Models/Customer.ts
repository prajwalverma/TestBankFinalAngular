export class Customer {
    CustomerId=0;
    FirstName;
    LastName;
    Email;
    Mobile;
    DateOfBirth;
    MaritalStatus;

    Address1;
    Address2;
    ZipCodeId;
    //CustomerId: number,
    // constructor( FirstName: string, LastName: string, Address1: string, Address2: string, Email: string, Mobile: number, DateOfBirth: Date, MaritalStatus: string, ZipCodeId: number) {
    //    // this.CustomerId = CustomerId;
    //     this.FirstName = FirstName;
    //     this.LastName = LastName;
    //     this.Address1 = Address1;
    //     this.Address2 = Address2;
    //     this.Email = Email;
    //     this.Mobile = Mobile;
    //     this.DateOfBirth = DateOfBirth;
    //     this.MaritalStatus = MaritalStatus;
    //     this.ZipCodeId = ZipCodeId;
    // }

    constructor(customerInfo:any,customerAddressInfo:any){
        this.FirstName=customerInfo.FirstName;
        this.LastName=customerInfo.LastName;
        this.Email=customerInfo.Email;
        this.Mobile=customerInfo.Mobile;
        this.DateOfBirth=customerInfo.DateOfBirth;
        this.MaritalStatus=customerInfo.MaritalStatus;

        this.Address1=customerAddressInfo.Address1;
        this.Address2=customerAddressInfo.Address2;
        this.ZipCodeId=customerAddressInfo.ZipCodeId;
    }

}