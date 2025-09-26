import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, catchError, of } from 'rxjs';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartApiItem {
  id?: number;               
  name: string;
  description?: string;
  release_date?: string;
  cover_image?: string;
  images?: string[];
  price: number;
  quantity: number;         
  total_price?: number;
  brand?: { id: number; name: string; image?: string; };
}

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private apiUrl = 'https://api.redseam.redberryinternship.ge/api/cart';

  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartApiItem[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadCart() {
  return this.http.get<CartApiItem[]>(this.apiUrl).pipe(
    tap(items => this.cartItemsSubject.next(items)),
    catchError(err => {
      if (err.status === 401) {
        console.warn('Not logged in yet, skipping cart load');
        this.cartItemsSubject.next([]); 
        return of([]); 
      }
      throw err; 
    })
  );
}

  addToCart(productId: number,color: string,size: string, quantity: number = 1) {
     return this.http.post<CartApiItem>(
      `${this.apiUrl}/products/${productId}`,
      { color, size, quantity }
    ).pipe(
      tap(() => this.loadCart().subscribe()) 
    );
  }

  changeQuantity(productId: number, quantity: number) {
    return this.http.patch<CartApiItem>(
      `${this.apiUrl}/products/${productId}`,
      { quantity }
    ).pipe(
      tap(() => this.loadCart().subscribe())
    );
  }

  removeFromCart(productId: number) {
    return this.http.delete(
      `${this.apiUrl}/products/${productId}`
    ).pipe(
      tap(() => this.loadCart().subscribe())
    );
  }

  checkout() {
    return this.http.post(`${this.apiUrl}/checkout`, {}).pipe(
      tap(() => this.cartItemsSubject.next([])) 
    );
  }

  getTotal(): number {
    return this.cartItemsSubject.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }
}
