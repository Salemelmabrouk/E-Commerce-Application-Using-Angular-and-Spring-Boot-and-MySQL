import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/'; // Replace with your API URL

  constructor(private http: HttpClient, private userStorageService: UserStorageService) {}

  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}sign-up`, userData);
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };

    return this.http.post<any>(`${this.baseUrl}authenticate`, body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const token = res.headers.get('authorization').substring(7);
        const user = res.body;
        if (token && user) {
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    );
  }
}
