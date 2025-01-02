import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculateLoan } from '../Models/CalculateLoan';
import { EmiStatuses } from '../Models/EmiStatus';
import { LoanAccount } from '../Models/LoanAccount';

@Injectable({
  providedIn: 'root'
})
export class LoanAccountService {

  url = 'https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/LoanAccounts';
  constructor(private httpclient: HttpClient) { }

  getAllLoanAccounts(): Observable<LoanAccount[]> {
    return this.httpclient.get<LoanAccount[]>(this.url);
  }

  createLoanAccount(loanAccount: LoanAccount): Observable<LoanAccount> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.post<LoanAccount>(this.url + '/PostLoanAccount/', loanAccount, httpOptions);
  }

  getLoanAccountByCustAccountId(custAccountId: number): Observable<LoanAccount> {
    return this.httpclient.get<LoanAccount>(this.url + "/" + custAccountId);
  }

  calculateLoan(loanDetails: CalculateLoan): Observable<CalculateLoan> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.post<CalculateLoan>('https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/CalculateLoan/', loanDetails, httpOptions);
  }

  updateLoanAccount(loanAccount: LoanAccount): Observable<LoanAccount> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.put<LoanAccount>(this.url + '/'+loanAccount.LoanAccountId, loanAccount, httpOptions);
  }

  getEMIStatus():Observable<EmiStatuses>{
    return this.httpclient.get<EmiStatuses>(this.url +"/GetEmiStatuses/" )
  }

}