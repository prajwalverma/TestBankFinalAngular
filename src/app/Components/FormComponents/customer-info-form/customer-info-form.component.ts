import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-customer-info-form',
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.css']
})
export class CustomerInfoFormComponent implements OnInit {

  @Input() formGroupName!: string

  custInfo!: FormGroup
  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.custInfo = this.rootFormGroup.control.get(this.formGroupName) as FormGroup
  }

}
