import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Header } from "./shared/header/header";
import { Cart } from "./cart/cart";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, Header, Cart],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecommerce-app');
}
