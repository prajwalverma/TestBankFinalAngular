import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { AccountType } from 'src/app/Models/AccountType';
import { CalculateLoan } from 'src/app/Models/CalculateLoan';
import { LoanAccountService } from 'src/app/services/loanAccount.service';

@Component({
  selector: 'app-loan-account-form',
  templateUrl: './loan-account-form.component.html',
  styleUrls: ['./loan-account-form.component.css']
})
export class LoanAccountFormComponent implements OnInit {

  @Input() filteredAccountTypes !: AccountType[];

  @Input() formGroupName!: string

  loanAccountForm!: FormGroup
  constructor(private rootFormGroup: FormGroupDirective, private loanAccountService: LoanAccountService) { }

  ngOnInit(): void {
    this.loanAccountForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup
  }

  totalamt!: any;
  emi!: any;

  calculateLoanmethod() {
    //this.loanAccountService.calculateLoan()
    let InterestRate;
    let duration = this.loanAccountForm.get('LoanDuration')?.value;
    let loanAmount = this.loanAccountForm.get('LoanAmount')?.value;
    this.filteredAccountTypes.forEach(x => {
      if (x.AccountTypeId == this.loanAccountForm.get('AccountTypeId')?.value) {
        InterestRate = x.InterestRate;
        this.loanAccountService.calculateLoan(new CalculateLoan(InterestRate, duration, loanAmount))
          .subscribe(l => {
            console.log(l);
            this.emi = l.EMI;
            this.totalamt = l.BalanceAmount;
            this.loanAccountForm.controls['BalanceAmount'].setValue(l.BalanceAmount);
          })
      }
    })
  }

  setAccountSubType(value: any) {
    this.filteredAccountTypes.forEach(x => {
      if (x.AccountTypeId == value.target.value) {
        this.loanAccountForm.controls['RateOfInterest'].setValue(x.InterestRate);
      }
    })
    this.loanAccountForm.controls['BalanceAmount'].setValue('');
    this.loanAccountForm.controls['LoanDuration'].setValue('');
    this.loanAccountForm.controls['BranchCode'].setValue('');
    
    this.emi = '';
    this.totalamt = '';
    
  }

  resetFields() {
    this.loanAccountForm.controls['BalanceAmount'].setValue('');
    this.emi = '';
    this.totalamt = '';
  }

  // loanAmount: number = 0;
  // roi: number = 7;
  // duration: number = 0;
  // totalBalance: number = 0;
  // emi = 0;
  // setLoanAmount(loanAmount: any) {
  //   this.loanAmount = parseInt(loanAmount);
  //   this.calculateBalance();
  // }
  // setDuration(duration: any) {
  //   this.duration = parseInt(duration);
  //   this.calculateBalance();
  // }
  // calculateBalance() {
  //   let duration = this.duration / 12;
  //   let roi = this.roi * duration;
  //   this.totalBalance = this.loanAmount + (this.loanAmount * (roi / 100));
  //   this.loanAccountForm.controls['BalanceAmount'].setValue(this.totalBalance);
  //   this.emi = this.totalBalance / this.duration;
  //   this.emi = (Math.round((10 ** 2) * this.emi) / (10 ** 2));
  // }

}
