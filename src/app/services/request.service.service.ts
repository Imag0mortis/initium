import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class RequestServiceService {

  constructor(private http: HttpClient) {}

  public getUserInfo() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*', 'User-Agent':'PostmanRuntime/7.36.3' }),
      withCredentials: true
    };
    return this.http.get('https://test-data.directorix.cloud/task1');
  }
}
