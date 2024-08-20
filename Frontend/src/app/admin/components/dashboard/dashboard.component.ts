import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ProductService } from '../../service/productService ';
import { ImageService } from '../../service/imageService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productService.productUpdated$.subscribe(() => {
      console.log('Product update received');
      this.loadProducts();  // Refresh products when notified
    });
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe(data => {
      this.products = data.map(product => {
        console.log(product?.bytesImg?.[0]); // Correctly log the first byte of the image data (if available)
        return {
          ...product,
          processedImg: product.bytesImg ? this.imageService.getImageUrl(product.bytesImg) : '' // Use the service method
        };
      });
    });
  }

  getImageUrl(bytes: Uint8Array): string {
    return this.imageService.getImageUrl(bytes);
  }

  onSearch(keyword: string): void {
    this.adminService.getAllProductsByName(keyword).subscribe(
      res => {
        console.log('Search results:', res);
        this.products = res.map((product: any) => ({
          ...product,
          processedImg: product.bytesImg ? this.imageService.getImageUrl(product.bytesImg) : ''  // Use the service method
        }));
      },
      error => {
        console.error('Error searching products:', error);
      }
    );
  }
}

