export class LoanAccount {
    LoanAccountId=0;
    CustAccountId;
    BalanceAmount;
    BranchCode;
    RateOfInterest;
    LoanDuration;
    LoanAmount;
    // constructor(LoanAccountId: number, CustAccountId: number, BalanceAmount: number, BranchCode: string, RateOfInterest: number, LoanDuration: number, LoanAmount: number) {
    //     this.LoanAccountId = LoanAccountId;
    //     this.CustAccountId = CustAccountId;
    //     this.BalanceAmount = BalanceAmount;
    //     this.BranchCode = BranchCode;
    //     this.RateOfInterest = RateOfInterest;
    //     this.LoanDuration = LoanDuration;
    //     this.LoanAmount = LoanAmount;
    // }

    constructor(custAccountId:number,loanAccount:LoanAccountForm){
        this.CustAccountId=custAccountId;
        
        this.BalanceAmount=loanAccount.BalanceAmount;
        this.BranchCode=loanAccount.BranchCode;
        this.RateOfInterest=loanAccount.RateOfInterest;
        this.LoanDuration=loanAccount.LoanDuration;
        this.LoanAmount=loanAccount.LoanAmount;
    }
}
export interface LoanAccountForm{
    BalanceAmount:any;
    BranchCode:any;
    RateOfInterest:any;
    LoanDuration:any;
    LoanAmount:any;
}