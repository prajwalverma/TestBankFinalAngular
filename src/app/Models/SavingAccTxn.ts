export class SavingAccTxn {
    SavingAccTxnId!:number;
    SavingAccountId;
    Balance!:number;
    TxnDate!:Date;
    Remarks;
    Amount;
    TxnDetails!:string; //withdraw or deposit
    // constructor(SavingAccTxnId: number, SavingAccountId: number, Balance: number, TxnDate: Date, Remarks: string, Amount: number, TxnDetails: string) {
    //     this.SavingAccTxnId = SavingAccTxnId;
    //     this.SavingAccountId = SavingAccountId;
    //     this.Balance = Balance;
    //     this.TxnDate = TxnDate;
    //     this.Remarks = Remarks;
    //     this.Amount = Amount;
    //     this.TxnDetails = TxnDetails;

    constructor(SavingAccountId:number,Remarks:string,Amount:number){
        this.SavingAccountId=SavingAccountId;
        this.Remarks=Remarks;
        this.Amount=Amount;
    }
}