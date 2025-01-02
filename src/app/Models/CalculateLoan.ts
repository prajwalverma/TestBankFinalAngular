//5fields
export class CalculateLoan{
    BalanceAmount!:number;//calculate
    EMI!:number; //calculate
    RateOfInterest;
    LoanDuration;
    LoanAmount;

    constructor(RateOfInterest:number,LoanDuration:number,LoanAmount:number){
        this.RateOfInterest=RateOfInterest;
        this.LoanAmount=LoanAmount;
        this.LoanDuration=LoanDuration;
    }
}