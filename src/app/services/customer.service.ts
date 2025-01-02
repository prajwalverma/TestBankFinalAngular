import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url='https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/Customers';
  constructor(private httpclient:HttpClient) { }

  getAllCustomers():Observable<Customer[]>{
    return this.httpclient.get<Customer[]>(this.url);
  }

  getCustomerById(CustomerId: number): Observable<Customer> {
    return this.httpclient.get<Customer>(this.url +"/" + CustomerId);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.post<Customer>(this.url + '/PostCustomer/', customer, httpOptions);
  }

  updateCustomer(customer:Customer):Observable<Customer>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpclient.put<Customer>(this.url + '/PutCustomer/'+customer.CustomerId, customer, httpOptions);
  }
}