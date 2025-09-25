import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService, CartItem, CartApiItem } from '../services/cart';
import { CartItemComponent } from '../shared/cart-item/cart-item';
import { NgIf, NgFor } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { CartPanelService } from '../services/cart-panel';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, NgIf, NgFor, AsyncPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit, OnDestroy {

  cartItems: CartApiItem[] = [];
  cartSub?: Subscription;
  isOpen$!: Observable<boolean>;

  constructor(private cartService: CartService, private panelService: CartPanelService, private router: Router) {}


  ngOnInit() {
    this.isOpen$ = this.panelService.isOpen$;

    this.cartService.loadCart().subscribe({
      error: err => console.error('loadCart failed', err)
    });

    this.cartSub = this.cartService.cartItems$.subscribe(items => {
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

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => console.log('Removed from cart'),
      error: err => console.error('Remove failed', err)
    });
  }

  goToCheckout() {
    if (this.cartItems.length === 0) return;
    this.panelService.close();
    this.router.navigate(['/checkout']);
  }

  click() {
    console.log("clicked");
  }

}
