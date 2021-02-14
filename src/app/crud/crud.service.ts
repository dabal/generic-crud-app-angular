import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from   '@angular/router';
import { HttpParams } from '@angular/common/http'

import { throwError } from 'rxjs';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators';


import {environment} from '../../environments/environment';
import {Token} from '../crud/token';


@Injectable({
  providedIn: 'root'
})
export class CrudService{

  private apiServer = environment.server_url;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private httpClient: HttpClient) { }

  getHeaders(): HttpHeaders{
   let token = localStorage.getItem('token');
    if(token!=null){
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+JSON.parse(token).token
      });
    }
    else{
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  getHttpOptions(){
let httpOptions={headers: this.getHeaders() };
return httpOptions;  
  }

  getById(viewId, id): Observable<Object> {
    
    return this.httpClient.get<Object>(this.apiServer+'/crud/details/'+viewId + '/' + id, this.getHttpOptions())
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAll(viewId, queryParams): Observable<Object[]> {
    
    
    let temp=new HttpParams({ fromObject: queryParams });
    //temp.toString()
    //let params = 
    return this.httpClient.get<Object[]>(this.apiServer+'/crud/'+viewId+'?'+temp.toString(), this.getHttpOptions() )
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id, viewId, value): Observable<Object> {

    let url=this.apiServer + '/crud/update/' +viewId + '/';
    if(id !=null){
      url=url+id;
    }
    if(id==null){
      delete(value.id);
    }

    return this.httpClient.post<Object>(url, JSON.stringify(value), this.getHttpOptions())
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id, value, viewId): Observable<Object> {

    let url=this.apiServer + '/crud/delete/' +viewId + '/';
    if(id !=null){
      url=url+id;
    }
    let options=this.getHttpOptions();
    options['body']=JSON.stringify(value);
    
    return this.httpClient.delete<Object>(url,  options)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getToken(ssoToken): Observable<Token> {

    return this.httpClient.get<Token>(this.apiServer + '/login/' + ssoToken, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getViewsForMenu():Observable<Object>{
    return this.httpClient.get<Object>(this.apiServer + '/meta/views', this.getHttpOptions())
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

 
}
