import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected the property name from 'styleUrl' to 'styleUrls'
})
export class NavbarComponent implements OnInit {
  
  title = 'EcomWebsite';
 
  isCustomerLoggedIn: boolean=UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean=UserStorageService.isAdminLoggedIn();
status: any;

  constructor(private router: Router, private userStorageService: UserStorageService) {
    this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn(); // Use this.userStorageService
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn(); // Use this.userStorageService
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn(); // Use this.userStorageService
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn(); // Use this.userStorageService
      }
    });
  }

  logout(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
