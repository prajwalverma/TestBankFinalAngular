export class TransferAmount {
    SenderSavingAccountId: number;
    RecieverSavingAccountId: number;
    Remarks: string;
    Amount: number;

    constructor(SenderSavingAccountId: number, RecieverSavingAccountId: number, Remarks: string, Amount: number) {
        this.SenderSavingAccountId = SenderSavingAccountId;
        this.RecieverSavingAccountId = RecieverSavingAccountId;
        this.Remarks = Remarks;
        this.Amount = Amount;
    }
}