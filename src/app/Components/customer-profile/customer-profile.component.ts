import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustAccount } from 'src/app/Models/CustAccount';
import { Customer } from 'src/app/Models/Customer';
import { CustomerAccountInfo } from 'src/app/Models/CustomerAccountInfo';
import { CustAccountService } from 'src/app/services/custAccount.service';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customerId: number = this.route.snapshot.params['id'];
  currentCustomer!: Customer;

  accountDetails: CustomerAccountInfo[] = []; //to store the all accounts with type details
  savingAccounts: CustomerAccountInfo[] = []; //same as above  for savings acc
  loanAccounts: CustomerAccountInfo[] = []; //same as above for loan acc

  constructor(private custAccountService: CustAccountService, private route: ActivatedRoute, private customerService: CustomerService, private router: Router) {
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.accountDetails = [];
    this.custAccountService.getAllCustomerAccountsInfoByCustomerId(this.customerId)
      .subscribe({
        next: allAccDetails => {
          this.accountDetails = allAccDetails;
          this.savingAccounts = this.accountDetails.filter(x => x.AccountType == "Savings Account")
          this.loanAccounts = this.accountDetails.filter(x => x.AccountType == "Loan Account")
        },
        error: err => {
          console.log('component:Customer-Profile-component,method:getAllAccounts,service:CustAccount')
          console.log(err);
        }
      })
  }


  getALLAccounts() {
    return this.accountDetails;
  }
  getLoanAccounts() {
    return this.loanAccounts;
  }
  getSavingAccounts() {
    return this.savingAccounts;
  }

  ngOnInit(): void {
    this.customerService.getCustomerById(this.customerId)
      .subscribe({
        next: customer => {
          this.currentCustomer = customer;
        },
        error: err => {
          // alert(err.statusText);
          this.showErrorAlert();
          this.router.navigateByUrl('/');
        }
      });
  }
  showErrorAlert() {

    Swal.fire({
  
      position: 'center',
  
      icon: 'error',
  
      title: 'OOPS! ',

      text:'Profile does not exist',
  
      showConfirmButton: true  ,
      confirmButtonColor: "#87CEEB"  
    })
  }


}