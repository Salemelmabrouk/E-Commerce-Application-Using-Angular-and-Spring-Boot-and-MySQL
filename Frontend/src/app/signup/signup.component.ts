import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { passwordMatchValidator } from '../validators/password-match.validator';

import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
isFieldInvalid(arg0: string): any {
throw new Error('Method not implemented.');
}
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
 
      this.snackbar.open("onmessage", "x", { duration: 5000, horizontalPosition: "center", verticalPosition: "top",panelClass:["custom-snackbar"] });
      return;
    }

    this.authService.signUp(this.registerForm.value).subscribe(
      () => {
         this.snackbar.open("content", 'close',{ 
          duration: 9000,
          verticalPosition: "top", // Allowed values are  'top' | 'bottom'
          horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
        });
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Sign-up error', error);
        this.snackbar.open('hjj','close' ,{
          duration:8000,
        });
         
          this.snackbar.open("Sign-up failed, please try again", 'close',{ 
            duration: 9000,
            verticalPosition: "top", // Allowed values are  'top' | 'bottom'
            horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
          });
      }
    );
  }
}
