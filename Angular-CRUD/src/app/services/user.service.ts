import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// const baseUrl = '/api/user';
const baseUrl = 'http://localhost:3000/api/user';

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
  
}