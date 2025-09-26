import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartPanelService } from '../../services/cart-panel';
import { CartApiItem, CartService } from '../../services/cart'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../../services/cart';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

  itemCount$!: Observable<number>;
  user$!: Observable<any | null>;
  dropdownOpen = false;


  constructor(
    private panelService: CartPanelService,
    private cartService: CartService, 
    private authService: Auth,
    private router: Router,
  ) {}

   ngOnInit() {
    this.itemCount$ = this.cartService.cartItems$.pipe(
      map((items: CartApiItem[]) => items.reduce((sum, item) => sum + item.quantity, 0))
    );

    this.user$ = this.authService.currentUser$;
  }

   toggleCart() {
    this.panelService.toggle();
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click')
  closeDropdown() {
    this.dropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.dropdownOpen = false;
    this.router.navigate(['/login']);
  }

}
