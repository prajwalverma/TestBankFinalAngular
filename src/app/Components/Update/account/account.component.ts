import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanAccount } from 'src/app/Models/LoanAccount';
import { SavingAccount } from 'src/app/Models/SavingAccount';
import { CustAccountService } from 'src/app/services/custAccount.service';
import { LoanAccountService } from 'src/app/services/loanAccount.service';
import { SavingAccountService } from 'src/app/services/savingAccount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountNumber: number = this.route.snapshot.params['id'];
  isSavingAccount = false;
  isLoanAccount = false;

  savingAccount!: SavingAccount;
  lonaAccount!: LoanAccount;

  savingAccountForm!:FormGroup;
  loanAccountForm!:FormGroup;

  customerId!:number;

  constructor(private custAccountService: CustAccountService,private router:Router,private route: ActivatedRoute, private fb: FormBuilder, private loanAccountService: LoanAccountService, private savingAccountService: SavingAccountService) {
   
    this.custAccountService.getCustomerIdByCustAccountId(this.accountNumber)
      .subscribe({
        next: custAccount => {
          this.customerId = custAccount.CustomerId;
        },
        error: err => {
          console.log(err);
        }
      })

    this.savingAccountForm = this.fb.group({
      TransferLimit: ['', [Validators.required]],
      BranchCode: ['', [Validators.required]],
    });

    this.loanAccountForm = this.fb.group({
      BranchCode: ['', [Validators.required]]
    });
    
    this.savingAccountService.getSavingAccountByCustAccountId(this.accountNumber)
      .subscribe({
        next: svacc => {
          this.isSavingAccount = true;
          this.savingAccount = svacc;
          console.log(this.savingAccount);
          this.savingAccountForm.controls['TransferLimit'].setValue(svacc.TransferLimit);
          this.savingAccountForm.controls['BranchCode'].setValue(svacc.BranchCode);
        },
        error: err => {
          console.log('This is a loan account')
          //console.log(err);

          this.loanAccountService.getLoanAccountByCustAccountId(this.accountNumber)
            .subscribe({
              next: lnacc => {
                this.isLoanAccount=true;
                this.lonaAccount=lnacc;
                console.log(this.lonaAccount);
                this.loanAccountForm.controls['BranchCode'].setValue(lnacc.BranchCode);
              },
              error: err => {
                console.log('component:accountUpdate,method:contructor,service:loanAcc')
                console.log(err);
                // alert('invalid account number');
                this.showErrorAlert();
                this.router.navigateByUrl('/Profile/' + this.customerId);
              }
            });
        }
      });
  }
  onSubmitSavingAccUpdateForm(){
    if(this.savingAccountForm.valid){
      this.savingAccount.BranchCode=this.savingAccountForm.value.BranchCode;
      this.savingAccount.TransferLimit=this.savingAccountForm.value.TransferLimit;
      console.log(this.savingAccount);

      this.savingAccountForm.reset();
      this.savingAccountService.updateSavingAccount(this.savingAccount)
      .subscribe({
        next:()=>{
          // alert(' Your account has been updated successfully');
          this.showSuccessAlert()
          this.router.navigateByUrl('/Profile/' + this.customerId);
        },
        error:err=>{
          console.log('component:Account(Updatefolder),method:onSubmitSavingAccUpdateForm,service:SavingAccountService')
          console.log(err);
        }
      })
    }
  }
  onSubmitLoanAccUpdateForm(){
    if(this.loanAccountForm.valid){
      this.lonaAccount.BranchCode = this.loanAccountForm.value.BranchCode;
      console.log(this.lonaAccount);

      this.loanAccountForm.reset();
      this.loanAccountService.updateLoanAccount(this.lonaAccount)
      .subscribe({
        next:()=>{
          // alert(' Your account has been updated successfully');
          this.showSuccessAlert()
          this.router.navigateByUrl('/Profile/' + this.customerId);
        },
        error:err=>{
          console.log('component:Account(Updatefolder),method:onSubmitLoanAccUpdateForm,service:LoanAccountService')
          console.log(err);
        }
      })
    }
  }

  // cancel(){
  //   this.loanAccountForm.reset();
  //   this.savingAccountForm.reset();
  //   this.router.navigateByUrl('/Profile/' + this.customerId);
  // }

  ngOnInit(): void {
  }

  showSuccessAlert() {

    Swal.fire({
  
      position: 'center',
  
      icon: 'success',
  
      title: 'Your account is updated successfully ',
  
      showConfirmButton: true  ,
      confirmButtonColor: "#87CEEB"  
    })
  }

  showErrorAlert() {

    Swal.fire({
  
      position: 'center',
  
      icon: 'error',
  
      title: 'Invalid Account Number ',
  
      showConfirmButton: true  ,
      confirmButtonColor: "#87CEEB"  
    })
  }

}
