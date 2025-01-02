export class EmiStatuses {

    NoOfCustomersPaidLastMonth: number;
    NoOfCustomersPendingLastMonth: number;
    NoOfCustomersPaidCurrentMonth: number;
    NoOfCustomersPendingCurrentMonth: number;
    
    constructor(NoOfCustomersPaidLastMonth: number, NoOfCustomersPendingLastMonth: number, NoOfCustomersPaidCurrentMonth: number, NoOfCustomersPendingCurrentMonth: number) {
        this.NoOfCustomersPaidCurrentMonth = NoOfCustomersPaidCurrentMonth;
        this.NoOfCustomersPaidLastMonth = NoOfCustomersPaidLastMonth;
        this.NoOfCustomersPendingCurrentMonth = NoOfCustomersPendingCurrentMonth;
        this.NoOfCustomersPendingLastMonth = NoOfCustomersPendingLastMonth;
    }

}
