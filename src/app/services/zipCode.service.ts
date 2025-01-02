import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ZipCode } from '../Models/ZipCode';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  url='https://testbankcustom-gaechgamg5epckhe.canadacentral-01.azurewebsites.net/api/ZipCodes';
  constructor(private httpclient:HttpClient) { }

  getAllZipCodes():Observable<ZipCode[]>{
    return this.httpclient.get<ZipCode[]>(this.url);
  }
}