import { Injectable } from '@angular/core';
import axios from 'axios';
import { Register } from '../register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  url = 'https://back-piporosa.onrender.com/'
  constructor( private http: HttpClient ) {}

  setAuthorization(auth?: string) {
    let authHeader: HttpHeaders = new HttpHeaders({'Authorization':`Bearer ${auth}`});
    return authHeader
  }

  post<T>(param: T, path: string, auth?: string): Observable<T> {
    return this.http.post<T>(`${this.url}${path}`, param, {
      headers: path !== 'user/signup' ? this.setAuthorization(auth) : this.httpHeaders
    })
  }
 
  get<T>(auth: string, path: string): Observable<T> {
    return this.http.get<T>(`${this.url}user/${path}/profile`, {headers: this.setAuthorization(auth)})
  }

  delete<T>(id: string, auth: string, path: string): Observable<T> {
    return this.http.delete<T>(`${this.url}user/${id}/${path}`, {headers: this.setAuthorization(auth)})
  }

}
