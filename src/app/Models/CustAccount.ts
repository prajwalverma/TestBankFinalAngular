export class CustAccount {
    CustAccountId=0;
    CustomerId;
    AccountTypeId;
    //CustAccountId: number,
    constructor( CustomerId: number, AccountTypeId: number) {
        //this.CustAccountId = CustAccountId;
        this.CustomerId = CustomerId;
        this.AccountTypeId = AccountTypeId;
    }
}