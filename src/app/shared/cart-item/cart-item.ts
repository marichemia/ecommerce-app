import { Component, Input } from '@angular/core';
import { CartItem, CartService, CartApiItem } from '../../services/cart';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss'
})
export class CartItemComponent {

@Input() item!: CartApiItem;

  constructor(private cartService: CartService) {}

   get productId(): number {
    return this.item.id!; 
  }

  increase() {
    const newQty = this.item.quantity + 1;
    this.cartService.changeQuantity(this.productId, newQty).subscribe({
      next: () => console.log('Quantity increased'),
      error: err => console.error('Failed to increase quantity', err)
    });
  }

  decrease() {
     if (this.item.quantity <= 1) return;
    const newQty = this.item.quantity - 1;
    this.cartService.changeQuantity(this.productId, newQty).subscribe({
      next: () => console.log('Quantity decreased'),
      error: err => console.error('Failed to decrease quantity', err)
    });
  }

  removeItem() {
    this.cartService.removeFromCart(this.productId).subscribe({
      next: () => console.log('Removed from cart'),
      error: err => console.error('Remove failed', err)
    });  }

}
