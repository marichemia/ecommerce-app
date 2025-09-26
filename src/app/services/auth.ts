import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartService } from './cart';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  private apiUrl = 'https://api.redseam.redberryinternship.ge/api';
  
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) { 
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        this.currentUserSubject.next(JSON.parse(raw));
      } catch {
        this.currentUserSubject.next(null);
      }
    }
  }

  register(formData: FormData): Observable<{ token: string, user: any }> {
    return this.http.post<any>(`${this.apiUrl}/register`, formData);
  }

   login(email: string, password: string): Observable<{ token: string, user?: any }> {
    return this.http.post<{ token: string, user?: any }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
          this.cartService.loadCart().subscribe();
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.cartService.clearCart();
  }

   getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null; 
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

 

}
