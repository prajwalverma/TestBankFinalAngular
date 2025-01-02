import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountType } from 'src/app/Models/AccountType';
import { CustAccount } from 'src/app/Models/CustAccount';
import { Customer } from 'src/app/Models/Customer';
import { LoanAccount } from 'src/app/Models/LoanAccount';
import { SavingAccount } from 'src/app/Models/SavingAccount';
import { SavingAccTxn } from 'src/app/Models/SavingAccTxn';
import { AccountTypeService } from 'src/app/services/accountType.service';
import { CustAccountService } from 'src/app/services/custAccount.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LoanAccountService } from 'src/app/services/loanAccount.service';
import { SavingAccountService } from 'src/app/services/savingAccount.service';
import { SavingAccTxnService } from 'src/app/services/savingAccTxn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  customerId: number = this.route.snapshot.params['id'];
  //currentCustomer!: Customer;

  isSavingAccountForm = false;
  isLoanAccountForm = false;

  savingAccountForm!: FormGroup;
  loanAccountForm!: FormGroup;


  //stores all account types
  accountTypes: AccountType[] = [];
  //stores unique account from all accounts as strings
  uniqueAccountTypes: any;
  //stores filtered account type wrt unique account type
  //(Ex: If savings acc is selected then this will have: savings:ZeroBalance,savings:Regular, etc.)
  filteredAccountTypes: AccountType[] = [];

  constructor(private savingAccTxnService: SavingAccTxnService, private custAccountService: CustAccountService, private savingAccountService: SavingAccountService, private loanAccountService: LoanAccountService, private fb: FormBuilder, private accountTypeService: AccountTypeService, private customerService: CustomerService, private router: Router, private route: ActivatedRoute) {
    this.customerService.getCustomerById(this.customerId)
      .subscribe({
        next: () => {
          //this.currentCustomer = customer;

          this.savingAccountForm = this.fb.group({
            savingAccountFormComponent: this.fb.group({
              Balance: ['', [Validators.required]],
              TransferLimit: ['', [Validators.required]],
              BranchCode: ['', [Validators.required]],
              AccountTypeId: ['', [Validators.required]]
            })
          })

          this.loanAccountForm = this.fb.group({
            loanAccountFormComponent: this.fb.group({
              BalanceAmount: ['', [Validators.required]],
              BranchCode: ['', [Validators.required]],
              RateOfInterest: ['', [Validators.required]],
              LoanDuration: ['', [Validators.required]],
              LoanAmount: ['', [Validators.required]],
              AccountTypeId: ['', [Validators.required]]
            })
          })

        },
        error: err => {
          // alert(err.statusText);
          this.showErrorAlert('Invalid profile');
          this.router.navigateByUrl('/');
        }
      });
    this.getAllAccountTypes();
  }


  getAllAccountTypes() {
    this.accountTypeService.getAllAccountTypes()
      .subscribe({
        next: allAccountTypes => {
          this.accountTypes = allAccountTypes;
          this.uniqueAccountTypes = new Set(this.accountTypes.map(x => x.AccountTypeName));
        },
        error: e => {
          console.log('component:app-register,method:getAllAccountTypes')
          console.log(e)
        }
      });
  }

  setAccountType(accountType: any) {
    this.filteredAccountTypes = this.accountTypes.filter(x => x.AccountTypeName == accountType.target.value);

    if (accountType.target.value == 'Savings Account') {
      this.isSavingAccountForm = true;
      this.isLoanAccountForm = false;
    }
    else if (accountType.target.value == 'Loan Account') {
      this.isSavingAccountForm = false;
      this.isLoanAccountForm = true;
    }
    this.savingAccountForm.get('savingAccountFormComponent')?.get('AccountTypeId')?.setValue("");
    this.loanAccountForm.get('loanAccountFormComponent')?.get('AccountTypeId')?.setValue("");
  }

  getFilteredAccounts(): AccountType[] {
    return this.filteredAccountTypes;
  }

  ngOnInit(): void {
  }

  cancel() {
    this.resetForms();
    this.router.navigateByUrl('/Profile/' + this.customerId);
  }

  resetForms() {
    this.savingAccountForm.reset();
    this.loanAccountForm.reset();
  }
  onSubmitSavingAccountForm() {
    if (this.savingAccountForm.valid) {

      let savingAccount = this.savingAccountForm.value.savingAccountFormComponent;

      if (savingAccount.AccountTypeId == 1) {
        savingAccount.Balance = 0;
      }
      console.log(savingAccount);

      this.resetForms();

      this.custAccountService.createCustAccount(new CustAccount(this.customerId, savingAccount.AccountTypeId))
        .subscribe({
          next: custAccount => {
            let initalBalance = savingAccount.Balance;
            savingAccount.Balance = 0;
            this.savingAccountService.createSavingAccount(new SavingAccount(custAccount.CustAccountId, savingAccount))
              .subscribe({
                next: savingAccount => {
                  // alert('Your Saving Account is created Successfully, Account Number:' + savingAccount.CustAccountId)
                  this.showSuccessAlert(custAccount.CustAccountId);
                  
                  if (custAccount.AccountTypeId != 1) {
                    this.savingAccTxnService.deposit(new SavingAccTxn(savingAccount.SavingAccountId, 'Initial Transaction', initalBalance))
                      .subscribe({
                        next: txn => {
                          console.log(txn);
                          this.ngOnInit();
                        },
                        error: err => {
                          console.log(err);
                          alert(err.error.Message)
                        }
                      });
                  }
                  this.router.navigateByUrl('/Profile/' + this.customerId);
                },
                error: err => {
                  console.log('component:add-account,method:onSubmitSavingAccountForm,service:SavingAccount');
                  console.log(err)
                  //delete account here from cust account table
                }
              })
          },
          error: err => {
            console.log('component:add-account,method:onSubmitSavingAccountForm,service:CustAccount');
            console.log(err);
            //delete customer here from customer table
          }
        })
    }
  }
  onSubmitLoanAccountForm() {
    if (this.loanAccountForm.valid) {

      let loanAccount = this.loanAccountForm.value.loanAccountFormComponent;
      console.log('success loan account data');
      console.log(loanAccount);

      //this is newly sends correct value to backend
      this.filteredAccountTypes.forEach(x => {
        if (x.AccountTypeId == loanAccount.AccountTypeId) {
          loanAccount.RateOfInterest = x.InterestRate;
        }
      })

      this.resetForms();

      this.custAccountService.createCustAccount(new CustAccount(this.customerId, loanAccount.AccountTypeId))
        .subscribe({
          next: custAccount => {
            this.loanAccountService.createLoanAccount(new LoanAccount(custAccount.CustAccountId, loanAccount))
              .subscribe({
                next: loanAccount => {
                  // alert('Your Loan Account is created Successfully, Account Number:' + loanAccount.CustAccountId);
                  this.showSuccessAlert(custAccount.CustAccountId);
                  this.router.navigateByUrl('/Profile/' + this.customerId);
                },
                error: err => {
                  console.log('component:app-register,method:onSubmitLoanAccountForm,service:LoanAccount');
                  console.log(err)
                  //delete account here from cust account table
                }
              })
          },
          error: err => {
            console.log('component:app-register,method:onSubmitLoanAccountForm,service:CustAccount');
            console.log(err);
            //delete customer here from customer table
          }
        })
    }
  }

  showSuccessAlert(id:number) {

    Swal.fire({
  
      position: 'center',
  
      icon: 'success',
  
      title: 'Your account number is: '+id,
  
      showConfirmButton: true  ,
      confirmButtonColor: "#87CEEB"  
    })
  }
  showErrorAlert(msg: string) {

    Swal.fire({
  
      position: 'center',
  
      icon: 'error',
  
      title: 'OOPS! ',

      text:msg,
  
      showConfirmButton: true  ,
      confirmButtonColor: "#87CEEB"  
    })
  }


}
