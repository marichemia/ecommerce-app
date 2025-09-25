import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CheckoutForm} from './checkout-form/checkout-form';
import { CheckoutSummary} from './checkout-summary/checkout-summary';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, CheckoutForm, CheckoutSummary],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {

}
