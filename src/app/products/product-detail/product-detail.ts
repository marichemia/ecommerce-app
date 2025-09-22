import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail {
  product: Product | null = null;

   constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProduct(id).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (err) => console.error('Failed to fetch product', err)
    });
  }

}
