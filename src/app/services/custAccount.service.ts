import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustAccount } from '../Models/CustAccount';
import { CustomerAccountInfo } from '../Models/CustomerAccountInfo';

@Injectable({
  providedIn: 'root'
})
export class CustAccountService {

  url='https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/CustAccounts';
  constructor(private httpclient:HttpClient) { }

  getAllCustAccounts():Observable<CustAccount[]>{
    return this.httpclient.get<CustAccount[]>(this.url);
  }

  createCustAccount(custAccount: CustAccount): Observable<CustAccount> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.post<CustAccount>(this.url + '/PostCustAccount/', custAccount, httpOptions);
  }

  getAllAccountsByCustomerId(customerId:number):Observable<CustAccount[]>{
    return this.httpclient.get<CustAccount[]>(this.url+'/GetCustAccountsByCustomerId/'+customerId);
  }

  getAllCustomerAccountsInfoByCustomerId(customerId:number):Observable<CustomerAccountInfo[]>{
    return this.httpclient.get<CustomerAccountInfo[]>(this.url+'/GetCustomerAccountInfoByCustomerId/'+customerId);
  }

  deleteCustAccount(CustAccountId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.delete<number>(this.url + '/DeleteCustAccount?id=' + CustAccountId, httpOptions);
  }

  getCustomerIdByCustAccountId(custAccountId : number){
    return this.httpclient.get<CustAccount>(this.url+'/GetCustAccountByCustAccountId/'+custAccountId);
  }
}