import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerProfileComponent } from './Components/customer-profile/customer-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { SavingAccOperationsComponent } from './Components/AccountOperations/saving-acc-operations/saving-acc-operations.component';
import { CustomerAddressFormComponent } from './Components/FormComponents/customer-address-form/customer-address-form.component';
import { CustomerInfoFormComponent } from './Components/FormComponents/customer-info-form/customer-info-form.component';
import { SavingAccountFormComponent } from './Components/FormComponents/saving-account-form/saving-account-form.component';
import { LoanAccountFormComponent } from './Components/FormComponents/loan-account-form/loan-account-form.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoanAccOperationsComponent } from './Components/AccountOperations/loan-acc-operations/loan-acc-operations.component';
import { AccountDetailsComponent } from './Components/account-details/account-details.component';
import { CustomerComponent } from './Components/Update/customer/customer.component';
import { AddAccountComponent } from './Components/add-account/add-account.component';
import { AccountComponent } from './Components/Update/account/account.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CustomerProfileComponent,
    SavingAccOperationsComponent,
    CustomerAddressFormComponent,
    CustomerInfoFormComponent,
    SavingAccountFormComponent,
    LoanAccountFormComponent,
    RegisterComponent,
    LoanAccOperationsComponent,
    AccountDetailsComponent,
    CustomerComponent,
    AddAccountComponent,
    AccountComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }