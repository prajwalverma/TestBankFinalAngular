import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanAccOperationsComponent } from './Components/AccountOperations/loan-acc-operations/loan-acc-operations.component';
import { SavingAccOperationsComponent } from './Components/AccountOperations/saving-acc-operations/saving-acc-operations.component';
import { AddAccountComponent } from './Components/add-account/add-account.component';
import { CustomerProfileComponent } from './Components/customer-profile/customer-profile.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { AccountComponent } from './Components/Update/account/account.component';
import {CustomerComponent} from './Components/Update/customer/customer.component'

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Profile/:id',component:CustomerProfileComponent},
  {path:'SavingAccount/:id',component:SavingAccOperationsComponent},
  {path:'LoanAccount/:id',component:LoanAccOperationsComponent},
  {path:'UpdateCustomer/:id',component:CustomerComponent},
  {path:'AddAccount/:id',component:AddAccountComponent},
  {path:'UpdateAccount/:id',component:AccountComponent},
  {path:'Login',component:HomeComponent},
  {path:'**',component:HomeComponent} //handles undefined url path in browser address-url
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
