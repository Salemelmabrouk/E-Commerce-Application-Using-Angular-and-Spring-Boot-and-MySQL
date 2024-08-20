import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserStorageService } from './services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EcomWebsite';
  isCustomerLoggedIn: boolean;
  isAdminLoggedIn: boolean;

  constructor(private router: Router, private userStorageService: UserStorageService) {}

  ngOnInit(): void {
    this.updateLoginStatus();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLoginStatus();
      }
    });
  }

  updateLoginStatus(): void {
    this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
    this.isAdminLoggedIn =  UserStorageService.isAdminLoggedIn();
  }

  logout(): void {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
