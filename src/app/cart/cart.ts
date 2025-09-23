import { Component } from '@angular/core';
import { CartService, CartItem } from '../services/cart';
import { CartItemComponent } from './cart-item/cart-item';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, NgIf],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get subtotal(): number {
    return this.cartService.getTotal();
  }

  get total(): number {
    return this.subtotal + 5;
  }

}
