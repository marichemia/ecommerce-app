import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '../../services/cart';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss'
})
export class CartItemComponent {

@Input() item!: CartItem;

  constructor(private cartService: CartService) {}

  increase() {
    this.cartService.updateQuantity(this.item.product.id, this.item.quantity + 1);
  }

  decrease() {
    if (this.item.quantity > 1) {
      this.cartService.updateQuantity(this.item.product.id, this.item.quantity - 1);
    }
  }

  removeItem() {
    this.cartService.removeFromCart(this.item.product.id);
  }

}
