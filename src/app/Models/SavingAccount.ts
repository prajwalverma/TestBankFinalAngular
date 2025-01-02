export class SavingAccount {
    SavingAccountId=0;
    CustAccountId;
    Balance;
    TransferLimit;
    BranchCode;
    
    constructor(custAccountId:number,savingAccount:SavingAccountForm){
        this.CustAccountId=custAccountId;

        this.Balance=savingAccount.Balance;
        this.TransferLimit=savingAccount.TransferLimit;
        this.BranchCode=savingAccount.BranchCode;
    }
}
export interface SavingAccountForm{
    Balance:any;
    TransferLimit:any;
    BranchCode:any;
}