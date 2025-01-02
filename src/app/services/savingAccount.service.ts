import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriorityCustomer } from '../Models/PriorityCustomer';
import { SavingAccount } from '../Models/SavingAccount';

@Injectable({
  providedIn: 'root'
})
export class SavingAccountService {

  url='https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/SavingAccounts';
  constructor(private httpclient:HttpClient) { }

  getAllSavingAccounts():Observable<SavingAccount[]>{
    return this.httpclient.get<SavingAccount[]>(this.url);
  }

  createSavingAccount(savingAccount: SavingAccount): Observable<SavingAccount> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.post<SavingAccount>(this.url + '/PostSavingAccount/', savingAccount, httpOptions);
  }

  getSavingAccountByCustAccountId(custAccountId: number): Observable<SavingAccount> {
    return this.httpclient.get<SavingAccount>(this.url + "/" + custAccountId);
  }

  updateSavingAccount(savingAcc: SavingAccount): Observable<SavingAccount> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.put<SavingAccount>(this.url + '/'+savingAcc.SavingAccountId, savingAcc, httpOptions);
  }

  getPriorityCustomers(balance:number):Observable<PriorityCustomer[]>{
    return this.httpclient.get<PriorityCustomer[]>('https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/PriorityCustomers/'+balance);
  }
}