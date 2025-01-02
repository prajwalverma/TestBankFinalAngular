import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountType } from 'src/app/Models/AccountType';
import { CustAccount } from 'src/app/Models/CustAccount';
import { Customer } from 'src/app/Models/Customer';
import { AccountTypeService } from 'src/app/services/accountType.service';
import { CustAccountService } from 'src/app/services/custAccount.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SavingAccountService } from 'src/app/services/savingAccount.service';
import { LoanAccountService } from 'src/app/services/loanAccount.service';
import { SavingAccount } from 'src/app/Models/SavingAccount';
import { LoanAccount } from 'src/app/Models/LoanAccount';
import { SavingAccTxn } from 'src/app/Models/SavingAccTxn';
import { SavingAccTxnService } from 'src/app/services/savingAccTxn.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  //variables to display form title
  formName !: string;

  //form variables
  registerForm!: FormGroup;
  savingAccountForm!: FormGroup;
  loanAccountForm!: FormGroup;

  //boolean variable to display form pages 
  isCustomerInfoForm!: boolean;
  isCustomerAddressForm!: boolean;
  isAccountForm!: boolean;

  //boolean variable to display forms according to selection
  isSavingAccountForm = false;
  isLoanAccountForm = false;

  //stores all account types
  accountTypes: AccountType[] = [];
  //stores unique account from all accounts as strings
  uniqueAccountTypes: any;
  //stores filtered account type wrt unique account type
  //(Ex: If savings acc is selected then this will have: savings:ZeroBalance,savings:Regular, etc.)
  filteredAccountTypes: AccountType[] = [];

  //to store the current customer details
  currentCustomer!: Customer;

  constructor(private savingAccTxnService:SavingAccTxnService,private fb: FormBuilder, private accountTypeService: AccountTypeService, private router: Router, private customerService: CustomerService, private custAccountService: CustAccountService, private savingAccountService: SavingAccountService, private loanAccountService: LoanAccountService) {
    this.displayCustomerInfoForm();//to display customerInfo on load
    this.getAllAccountTypes();
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      customerInfo: this.fb.group({
        FirstName: ['', [Validators.required]],
        LastName: ['', [Validators.required]],
        Email: ['', [Validators.required]],
        Mobile: ['', [Validators.required]],
        DateOfBirth: ['', [Validators.required]],
        MaritalStatus: ['', [Validators.required]]
      }),
      customerAddressInfo: this.fb.group({
        Address1: ['', [Validators.required]],
        Address2: ['', [Validators.required]],
        ZipCodeId: ['', [Validators.required]]
      }),
    });

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

  displayCustomerInfoForm() {
    this.formName = "Personal Details";
    this.isCustomerInfoForm = true;
    this.isCustomerAddressForm = false;
    this.isAccountForm = false;
  }

  displayAddressForm() {
    this.formName = "Address Details";
    this.isCustomerInfoForm = false;
    this.isCustomerAddressForm = true;
    this.isAccountForm = false;
  }

  displayAccountForm() {
    this.formName = "Account";
    this.isCustomerInfoForm = false;
    this.isCustomerAddressForm = false;
    this.isAccountForm = true;
  }

  onSubmitCustomerForm() {
    if (this.registerForm.valid) {
      this.currentCustomer = new Customer(this.registerForm.value.customerInfo, this.registerForm.value.customerAddressInfo);
      console.log('got customer data')
      console.log(this.currentCustomer);
    }
  }

  onSubmitSavingAccountForm() {

    if (this.savingAccountForm.valid) {
      let savingAccount = this.savingAccountForm.value.savingAccountFormComponent; //note this 
      console.log('success saving acccount data');
      console.log(savingAccount);

        if(savingAccount.AccountTypeId==1){
          savingAccount.Balance=0;
        }

      this.resetForms();

      this.customerService.createCustomer(this.currentCustomer)
        .subscribe({
          next: customer => {
            // alert('You are registered Successfully your customer id is:'+customer.CustomerId)
            this.custAccountService.createCustAccount(new CustAccount(customer.CustomerId, savingAccount.AccountTypeId))
              .subscribe({
                next: custAccount => {
                  let initalBalance = savingAccount.Balance;
                  savingAccount.Balance=0;
                  this.savingAccountService.createSavingAccount(new SavingAccount(custAccount.CustAccountId, savingAccount))
                    .subscribe({
                      next: savingAccount => {
                        // alert('Your Saving Account is created Successfully, Account Number:' + savingAccount.CustAccountId)
                        this.showSuccessAlert(customer.CustomerId, custAccount.CustAccountId, customer.FirstName +' ' + customer.LastName);
          
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
                        this.router.navigateByUrl('/Login');
                      },
                      error: err => {
                        console.log('component:app-register,method:onSubmitSavingAccountForm,service:SavingAccount');
                        console.log(err)
                        //delete account here from cust account table
                      }
                    })
                },
                error: err => {
                  console.log('component:app-register,method:onSubmitSavingAccountForm,service:CustAccount');
                  console.log(err);
                  //delete customer here from customer table
                }
              })
          },
          error: err => {
            console.log('component:app-register,method:onSubmitSavingAccountForm,service:Customer');
            console.log(err);
            //alert('Sorry could not register you, Try again later');
          }
        })
      //check this out
      //console.log(Object.keys(this.savingAccountForm.value.savingAccountFormComponent))
    }
  }

  onSubmitLoanAccountForm() {
    if (this.loanAccountForm.valid) {
      let loanAccount = this.loanAccountForm.value.loanAccountFormComponent;
      console.log('success loan account data');
      console.log(loanAccount);

      //this is newly sends correct value to backend
      this.filteredAccountTypes.forEach(x=>{
        if(x.AccountTypeId==loanAccount.AccountTypeId){
          loanAccount.RateOfInterest=x.InterestRate;
        }
      })

      this.resetForms();

      this.customerService.createCustomer(this.currentCustomer)
      .subscribe({
        next: customer => {
          //alert('You are registered Successfully your customer id is:'+customer.CustomerId)
          this.custAccountService.createCustAccount(new CustAccount(customer.CustomerId, loanAccount.AccountTypeId))
            .subscribe({
              next: custAccount => {
                this.loanAccountService.createLoanAccount(new LoanAccount(custAccount.CustAccountId, loanAccount))
                  .subscribe({
                    next: loanAccount => {
                      // alert('Your Loan Account is created Successfully, Account Number:' + loanAccount.CustAccountId);
                      this.showSuccessAlert(customer.CustomerId, custAccount.CustAccountId, customer.FirstName +' ' + customer.LastName);
          
                      this.router.navigateByUrl('/Login');
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
        },
        error: err => {
          console.log('component:app-register,method:onSubmitLoanAccountForm,service:Customer');
          console.log(err);
          //alert('Sorry could not register you, Try again later');
        }
      })
    }
  }

  cancel() {
    this.resetForms();
    this.router.navigateByUrl('/');
  }

  resetForms(){
    this.registerForm.reset();
    this.savingAccountForm.reset();
    this.loanAccountForm.reset();
  }
  showSuccessAlert(id:number, custAccId: number, name:string) {

    Swal.fire({
  
      position: 'center',
  
      icon: 'success',

      title: 'Congartulations!!',
  
      text: 'Your Account has been successfully Created Your ID is:'+id
              +" Account Number is:"+custAccId,
  
      showConfirmButton: true,
      confirmButtonColor: '#87CEEB'
  
      // timer: 30000
  
    })
    // Swal.fire('Congratulations! '+name, 'Your Account has been successfully Created Your ID is:'+id
    //   +" Account Number is:"+custAccId , 'success')
  
  }  
}
