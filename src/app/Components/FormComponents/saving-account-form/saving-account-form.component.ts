import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { AccountType } from 'src/app/Models/AccountType';

@Component({
  selector: 'app-saving-account-form',
  templateUrl: './saving-account-form.component.html',
  styleUrls: ['./saving-account-form.component.css']
})
export class SavingAccountFormComponent implements OnInit {

  @Input()  filteredAccountTypes !:AccountType[]; //= [];

  isZeroBalance = false;

  @Input() formGroupName!: string

  savingAccountForm!: FormGroup
  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.savingAccountForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup
  }


  setSavingAccountType(savingAccountTypeId: any) {
    let temp = this.filteredAccountTypes.filter(x => x.AccountTypeId == savingAccountTypeId.target.value)
    temp[0].AccountSubType == 'Zero Balance' ? this.isZeroBalance = true : this.isZeroBalance = false;
    this.savingAccountForm.controls['Balance'].setValue(0);
  }

}
