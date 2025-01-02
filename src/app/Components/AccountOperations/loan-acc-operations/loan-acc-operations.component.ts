import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalculateLoan } from 'src/app/Models/CalculateLoan';
import { LoanAccount } from 'src/app/Models/LoanAccount';
import { LoanAccTxn } from 'src/app/Models/LoanAccTxn';
import { CustAccountService } from 'src/app/services/custAccount.service';
import { LoanAccountService } from 'src/app/services/loanAccount.service';
import { LoanAccTxnService } from 'src/app/services/loanAccTxn.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loan-acc-operations',
  templateUrl: './loan-acc-operations.component.html',
  styleUrls: ['./loan-acc-operations.component.css']
})
export class LoanAccOperationsComponent implements OnInit {

  accountNumber: number = this.route.snapshot.params['id'];
  lntxns: LoanAccTxn[] = [];
  loanAccount !: LoanAccount;
  EmiAmount!: number;
  isPay = true;
  customerId!: number;

  constructor(private router: Router, private custAccountService: CustAccountService, private loanAccountService: LoanAccountService, private route: ActivatedRoute, private formBuilder: FormBuilder, private loanAccTxnService: LoanAccTxnService) {
    this.custAccountService.getCustomerIdByCustAccountId(this.accountNumber)
      .subscribe({
        next: custAccount => {
          this.customerId = custAccount.CustomerId
        },
        error: err => {
          console.log(err);
        }
      })
  }

  ngOnInit(): void {
    this.loanAccTxnService.getLoanAccTxnByAccountId(this.accountNumber)
      .subscribe({
        next: txn => this.lntxns = txn,
        error: err => {
          console.log('component:LoanAccOperation,method:Constructor,service:LoanAccTxn');
          console.log(err);
        }
      });
    this.loanAccountService.getLoanAccountByCustAccountId(this.accountNumber)
      .subscribe({
        next: la => {
          this.loanAccount = la;
          if (la.BalanceAmount == 0) {
            this.isPay = false;
          }
          else {
            this.loanAccountService.calculateLoan(new CalculateLoan(la.RateOfInterest, la.LoanDuration, la.LoanAmount))
              .subscribe({
                next: calcLoan => {
                  this.EmiAmount = calcLoan.EMI;
                },
                error: err => {
                  this.router.navigateByUrl('/');
                  console.log('component:LoanAccOperation,method:Constructor,service:loanAcc');
                  console.log(err);
                }
              })
          }
        },
        error: err => {
          console.log('component:LoanAccOperation,method:Constructor,service:loanAcc');
          this.showErrorAlert('Invalid Loan account');
          this.router.navigateByUrl('/');
          console.log(err);
        }
      })
  }

  payEmi() {
    this.loanAccTxnService.payEmi(new LoanAccTxn(this.EmiAmount, this.loanAccount.LoanAccountId))
      .subscribe({next: 
        txn => {
        this.showSuccessAlert(txn.EmiAmount.toString());
        console.log(txn);
        this.ngOnInit();
        },
        error: err => {
          this.showErrorAlert('Something went wrong. Please try again later.');
          console.log('component:LoanAccOperation,method:PayEmi,service:loanAcctxn');
          console.log(err);
        }
      });

    console.log(this.EmiAmount);
  }

  showSuccessAlert(amt:string) {

    Swal.fire({
  
      position: 'center',
  
      icon: 'success',
  
      title: 'Success ',

      text:'EMI of ₹'+ amt +' paid successfully',
  
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
