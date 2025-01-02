import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../Models/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url='https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/Country';
  constructor(private httpclient:HttpClient) { }

  getAllCountries():Observable<Country[]>{
    return this.httpclient.get<Country[]>(this.url);
  }
}
