import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartPanelService } from '../../services/cart-panel';
import { CartService } from '../../services/cart'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../../services/cart';


@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

  itemCount$!: Observable<number>;

  constructor(
    private panelService: CartPanelService,
    private cartService: CartService
  ) {}

   ngOnInit() {
    this.itemCount$ = this.cartService.cartItems$.pipe(
      map((items: CartItem[]) => items.reduce((s, i) => s + i.quantity, 0))
    );
  }

   toggleCart() {
    this.panelService.toggle();
  }
}
