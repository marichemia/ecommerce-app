import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../services/products';
import { CartService } from '../../services/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  selectedColor!: string;
  selectedSize!: string;
  quantity: number = 1;


   constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProduct(id).subscribe({
      next: (response) => {
        this.product = response;
        this.selectedColor = this.product.available_colors[0] ?? '';
        this.selectedSize = this.product.available_sizes[0] ?? '';
      },
      error: (err) => console.error('Failed to fetch product', err)
    });
  }


  addToCart(): void {
    if (!this.product) return;

  this.cartService.cartItems$.subscribe(cartItems => {
    const existingItem = cartItems.find(item => 
      item.id === this.product!.id 
    );

    let finalQuantity = this.quantity;

    if (existingItem) {
      finalQuantity += existingItem.quantity;
    }

    this.cartService.addToCart(this.product!.id, this.selectedColor, this.selectedSize, finalQuantity)
      .subscribe({
        next: createdItem => {
          console.log('Added to cart', createdItem);
        },
        error: err => {
          console.error('Add to cart failed', err);
        }
      });
  }).unsubscribe(); 
  }

}
