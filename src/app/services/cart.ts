import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems); // notify subscribers
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(p => p.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }
}
