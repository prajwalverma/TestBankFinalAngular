import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAccountInfo } from 'src/app/Models/CustomerAccountInfo';
import { CustAccountService } from 'src/app/services/custAccount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  @Input() accountDetails!: CustomerAccountInfo[];

  @Output() someChanges = new EventEmitter();

  globalBool = false;

  constructor(private router: Router, private custAccountService: CustAccountService) { }

  ngOnInit(): void {
  }

  goToAccountDetails(account: CustomerAccountInfo) {
    if (account.AccountType == 'Savings Account') {
      this.router.navigateByUrl('/SavingAccount/' + account.AccountNumber);
    } else if (account.AccountType == 'Loan Account') {
      this.router.navigateByUrl('/LoanAccount/'+account.AccountNumber);
    }
  }
  // deleteAccountByCustAccountId(custAccountId: number) {
  //   if (confirm("Are you sure you want to delete this Account?")) {
  //     this.custAccountService.deleteCustAccount(custAccountId).subscribe(() => {
  //       this.someChanges.emit(null);
  //     });
  //   }
  // }
  deleteAccountByCustAccountId(custAccountId: number) {

    this.confirmDeleteAlert(custAccountId);

  }
  confirmDeleteAlert(custAccountId:number) {

    Swal.fire({

      title: 'Are you sure?',

      text: 'This action can\'t be undone',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Confirm',
      confirmButtonColor: "crimson",

      cancelButtonText: 'Cancel',

    }).then((result) => {

      if (result.isConfirmed) {

        this.custAccountService.deleteCustAccount(custAccountId).subscribe(() => {

          this.someChanges.emit(null);

        });

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!')

      }

    })

  }
}
