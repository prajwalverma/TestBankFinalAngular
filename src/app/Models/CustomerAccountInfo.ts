export class CustomerAccountInfo {
    AccountNumber;
    AccountType;
    AccountSubType;

    constructor(AccountNumber: number, AccountType: string, AccountSubType: string) {
        this.AccountNumber = AccountNumber;
        this.AccountSubType = AccountSubType;
        this.AccountType = AccountType;
    }
}