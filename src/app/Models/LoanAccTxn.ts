export class LoanAccTxn {
    LoanAccTxnId!:number;
    LoanAccountId!:number;
    EmiDate!:Date;
    EmiAmount!:number;
    Status!:string;
    PendingAmount!:number;
    
    // constructor(LoanAccTxnId: number, LoanAccountId: number, EmiDate: Date, EmiAmount: number, Status: string, PendingAmount: number) {
    //     this.LoanAccTxnId = LoanAccTxnId;
    //     this.LoanAccountId = LoanAccountId;
    //     this.EmiDate = EmiDate;
    //     this.EmiAmount = EmiAmount;
    //     this.Status = Status;
    //     this.PendingAmount = PendingAmount;
    // }

    constructor(EmiAmount:number,LoanAccountId:number){
        this.EmiAmount=EmiAmount;
        this.LoanAccountId=LoanAccountId;
    }
}