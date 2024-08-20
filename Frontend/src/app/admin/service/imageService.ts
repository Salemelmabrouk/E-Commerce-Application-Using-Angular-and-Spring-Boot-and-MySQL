// image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

    getImageUrl(bytes: Uint8Array): string {
        const base64String = btoa(String.fromCharCode(...bytes));
        return `data:image/jpeg;base64,${bytes}`;
      }
}
