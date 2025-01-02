export class AccountType {
    AccountTypeId;
    AccountTypeName;
    AccountSubType;
    InterestRate;

    constructor(AccountTypeId: number, AccountTypeName: string, AccountSubType: string,InterestRate:number) {
        this.AccountTypeId = AccountTypeId;
        this.AccountTypeName = AccountTypeName;
        this.AccountSubType = AccountSubType;
        this.InterestRate = InterestRate;
    }
}