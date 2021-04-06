import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customer } from '../interfaces/customer';
import { Order } from '../interfaces/order';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiServer = "https://naaserver.herokuapp.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(Customer): Observable<Customer> {
    console.log(Customer);
    return this.httpClient.post<Customer>(this.apiServer + '/customer', Customer, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<Customer> {
    return this.httpClient.get<Customer>(this.apiServer + '/customer/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiServer + '/customers')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, Customer): Observable<Customer> {
    console.log(id);
    console.log(Customer);
    return this.httpClient.post<Customer>(this.apiServer + '/customer/' + id, Customer, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
