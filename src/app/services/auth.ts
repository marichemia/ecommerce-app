import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  private apiUrl = 'https://api.redseam.redberryinternship.ge/api';

  constructor(private http: HttpClient) { }

  register(formData: FormData): Observable<{ token: string, user: any }> {
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/register`, formData)
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }

   logout() {
    localStorage.removeItem('token');
  }

   getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null; 
  }

 

}
