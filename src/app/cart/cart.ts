import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart';
import { CartItemComponent } from './cart-item/cart-item';
import { NgIf, NgFor } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { CartPanelService } from '../services/cart-panel';
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, NgIf, NgFor, AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  cartSub?: Subscription;
  isOpen$!: Observable<boolean>;

  ngOnInit() {
    this.isOpen$ = this.panelService.isOpen$;

    this.cartSub = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }


  constructor(private cartService: CartService, private panelService: CartPanelService) {
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

  closePanel() {
    this.panelService.close();
  }

  ngOnDestroy() {
    this.cartSub?.unsubscribe();
  }

}
