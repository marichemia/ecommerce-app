import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { Product, ProductListResponse } from '../../services/products';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {

  products: Product[] = [];
  currentPage = 1;
  lastPage = 1;
  priceFrom?: number;
  priceTo?: number;
  sort?: string;

  constructor(private productsService: ProductsService) {}

  ngOnInit() : void {
    this.loadProducts();
  }

  loadProducts(page: number = 1) {
    this.productsService.getProducts(page, this.priceFrom, this.priceTo, this.sort)
      .subscribe((res: ProductListResponse) => {
        this.products = res.data;
        this.currentPage = res.meta.current_page;
        this.lastPage = res.meta.last_page;
      });
  }

  onPageChange(page: number): void {
    this.loadProducts(page);
  }

  onFilterChange(): void {
    this.loadProducts(1); 
  }

  onSortChange(): void {
    this.loadProducts(1);
  }





}
