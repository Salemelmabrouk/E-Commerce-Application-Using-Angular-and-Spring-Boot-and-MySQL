import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUpdatedSource = new Subject<void>();
  productUpdated$ = this.productUpdatedSource.asObservable();

  notifyProductUpdated() {
    console.log('Product updated notification sent');
    this.productUpdatedSource.next();
  }
}