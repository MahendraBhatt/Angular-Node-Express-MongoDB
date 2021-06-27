import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

var baseUrl = 'http://localhost:3000/api/user';
if (environment.production) {
  baseUrl = '/api/user';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createNewUser(data: any) {
    return this.http.post(`${baseUrl}/register`, data);
  }

  userLogin(data: any) {
    return this.http.post(`${baseUrl}/login`, data);
  }

  forgotPassword(data: any){
    return this.http.post(`${baseUrl}/forgotPassword`, data);
  }

  setPassword(data: any){
    return this.http.post(`${baseUrl}/setPassword`, data);
  }
    
}