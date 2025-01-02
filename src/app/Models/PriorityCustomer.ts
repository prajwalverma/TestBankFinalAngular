export class PriorityCustomer{
      CustomerId:number;
          FullName:string;
          CustAccountId:number;
          Balance:number;

          constructor(CustomerId:number,FullName:string,CustAccountId:number,Balance:number){
              this.CustomerId=CustomerId;
              this.FullName= FullName;
              this.CustAccountId=CustAccountId;
              this.Balance=Balance;
          }
}