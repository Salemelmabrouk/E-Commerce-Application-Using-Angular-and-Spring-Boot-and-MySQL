import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css']
})
export class PostProductComponent implements OnInit {
  productForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  listOfCategories: any = [];
  selectedFiles: { file: File, url: string | ArrayBuffer | null }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bytesImg: [null],
    });
    this.getAllCategories();
  }

  getImageUrl(bytes: Uint8Array): string {
    const base64String = btoa(String.fromCharCode(...bytes));
    return `data:image/jpeg;base64,${base64String}`;
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.selectedFiles = []; // Clear previous selections
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFiles.push({ file: file, url: reader.result });
        if (i === 0) { // Only set imagePreview for the first image
          this.imagePreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  clearForm() {
    this.productForm.reset();
    this.selectedFiles = [];
    this.imagePreview = null;
  }

  getAllCategories() {
    this.adminService.getAllCategory().subscribe(res => {
      this.listOfCategories = res;
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      const formData = this.prepareFormData();
  
      this.adminService.addProduct(formData).subscribe(
        (response: any) => {
          if (response.id != null) {
            this.snackBar.open('Product posted successfully', 'X', { duration: 5000 });
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            this.snackBar.open(response.message, 'ERROR', { duration: 5000 });
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      this.productForm.markAllAsTouched();
    }
  }
  
  prepareFormData(): FormData {
    const formData = new FormData();
  
    // Append the product details as JSON
    formData.append(
      'product',
      new Blob([JSON.stringify(this.productForm.value)], { type: 'application/json' })
    );
  
    // Append the images
    this.selectedFiles.forEach((fileObj, index) => {
      formData.append(
        `imageFile${index}`,
        fileObj.file,
        fileObj.file.name,
        
      );
    });
  
    return formData;
  }
  
   
}
