import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanAccTxn } from '../Models/LoanAccTxn';

@Injectable({
  providedIn: 'root'
})
export class LoanAccTxnService {

  url='https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/LoanAccTxns';
  constructor(private httpclient:HttpClient) { }

  getAllLoanAccTxns():Observable<LoanAccTxn[]>{
    return this.httpclient.get<LoanAccTxn[]>(this.url);
  }

  // createLoanAccTxn(loanAccTxn: LoanAccTxn): Observable<LoanAccTxn> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.httpclient.post<LoanAccTxn>(this.url + '/PostLoanAccTxn/', loanAccTxn, httpOptions);
  // }

  payEmi(loanAccTxn: LoanAccTxn): Observable<LoanAccTxn> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.httpclient.post<LoanAccTxn>(this.url + '/PostLoanAccTxn/', loanAccTxn, httpOptions);
    }

  getLoanAccTxnByAccountId(account:number):Observable<LoanAccTxn[]>{
    return this.httpclient.get<LoanAccTxn[]>(this.url +"/GetLoanAccTxnsByAccountId/" + account);
  }
}