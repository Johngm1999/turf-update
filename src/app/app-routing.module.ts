import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegistrationComponent},
  { path:'dashboard', component:DashboardComponent},
  { path:'viewbookings', component:ViewbookingsComponent},
  { path:'payment', component:PaymentComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
