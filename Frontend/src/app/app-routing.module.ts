import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {   LoginComponent } from './login/login.component'; // Assuming this is your login component
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TrackOrderComponent } from './track-order/track-order.component';

const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
    { path: 'login', component: LoginComponent }, // Assuming LoginComponent is your login component
    { path: 'register', component: SignupComponent }, // Assuming RegisterComponent is your register component
    { path: 'home', component: HomeComponent }, // Assuming HomeComponent is your home component
    { path: 'order', component: TrackOrderComponent }, // Assuming TrackOrderComponent is your TrackOrder component
    { path: 'notifications', component: NotificationsComponent }, // Assuming NotificationsComponent is your Notifications  component
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' } // Handle any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
