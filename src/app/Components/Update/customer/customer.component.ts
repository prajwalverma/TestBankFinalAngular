import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/Models/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerId: number = this.route.snapshot.params['id'];

  updateForm!:FormGroup;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {

    this.updateForm = this.fb.group({
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

    this.customerService.getCustomerById(this.customerId)
      .subscribe({
        next: customer => {

          this.updateForm.get('customerInfo')?.get('FirstName')?.setValue(customer.FirstName);
          this.updateForm.get('customerInfo')?.get('LastName')?.setValue(customer.LastName);
          this.updateForm.get('customerInfo')?.get('Email')?.setValue(customer.Email);
          this.updateForm.get('customerInfo')?.get('Mobile')?.setValue(customer.Mobile);
          this.updateForm.get('customerInfo')?.get('DateOfBirth')?.setValue(formatDate(customer.DateOfBirth,'yyyy-MM-dd','en'));
          this.updateForm.get('customerInfo')?.get('MaritalStatus')?.setValue(customer.MaritalStatus);

          this.updateForm.get('customerAddressInfo')?.get('Address1')?.setValue(customer.Address1);
          this.updateForm.get('customerAddressInfo')?.get('Address2')?.setValue(customer.Address2);
          this.updateForm.get('customerAddressInfo')?.get('ZipCodeId')?.setValue(customer.ZipCodeId);
        },
        error: err => {
          // alert(err.statusText);
          this.showErrorAlert();
          this.router.navigateByUrl('/');
        }
      });
  }

  onSubmitCustomerUpdateForm(){
    if(this.updateForm.valid){
      let customer = new Customer(this.updateForm.value.customerInfo, this.updateForm.value.customerAddressInfo);
      customer.CustomerId=this.customerId;

      this.updateForm.reset();
      this.customerService.updateCustomer(customer)
      .subscribe({
        next:()=>{
          // alert(' your profile is updated successfully');
          this.showSuccessAlert();
          this.router.navigateByUrl('/Profile/' + this.customerId);
        },
        error:err=>{
          console.log('component:Customer,method:onSubmitCustomerUpdateForm,service:customerService')
          console.log(err);
        }
      })
    }
  }

  cancel(){
    this.updateForm.reset();
    this.router.navigateByUrl('/Profile/' + this.customerId);
  }

  showSuccessAlert() {

    Swal.fire({
  
      position: 'center',
  
      icon: 'success',
  
      title: 'Your profile is updated successfully ',
  
      showConfirmButton: true  ,
      confirmButtonColor: "#87CEEB"  
    })
  }

  showErrorAlert() {

    Swal.fire({
  
      position: 'center',
  
      icon: 'error',
  
      title: 'Invalid Customer ',
  
      showConfirmButton: true  ,
      confirmButtonColor: "#87CEEB"  
    })
  }

}
