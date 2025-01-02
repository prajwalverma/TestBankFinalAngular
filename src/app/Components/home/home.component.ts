import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  searchCustomer(customerId: any) {
    customerId = customerId.trim();

    if (Number.isInteger(parseInt(customerId))) {
      this.customerService.getCustomerById(customerId)
        .subscribe({
          next: customer => {
            this.router.navigateByUrl('/Profile/' + customer.CustomerId);
          },
          error: err => {
            //alert(err.statusText);
            this.showErrorAlert();
          }
        });
    }
    else {
      // alert('please enter a valid Id')
      this.showErrorAlert();
    }

  }

  showErrorAlert() {

    Swal.fire({
  
      position: 'center',
  
      icon: 'error',
  
      title: 'Please enter a valid id',
  
      showConfirmButton: false,
  
      timer: 3000
  
    })
    //Swal.fire('OOPS Error Occured!', errorMsg, 'warning')
  }
  
  
}
