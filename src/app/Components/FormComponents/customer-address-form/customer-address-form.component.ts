import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { City } from 'src/app/Models/City';
import { Country } from 'src/app/Models/Country';
import { State } from 'src/app/Models/State';
import { ZipCode } from 'src/app/Models/ZipCode';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';
import { ZipCodeService } from 'src/app/services/zipCode.service';

@Component({
  selector: 'app-customer-address-form',
  templateUrl: './customer-address-form.component.html',
  styleUrls: ['./customer-address-form.component.css']
})
export class CustomerAddressFormComponent implements OnInit {

  @Input() formGroupName!: string

  countries: Country[] = [];
  states: State[] = [];
  filteredStates: State[] = [];
  cities: City[] = [];
  filteredCities: City[] = [];
  zipCodes: ZipCode[] = [];
  zipCodeId: any;

  addressInfo!: FormGroup
  constructor(private rootFormGroup: FormGroupDirective,private countryService: CountryService, private stateService: StateService, private cityService: CityService, private zipCodeService: ZipCodeService) {
    this.getAllCountries();
    this.getAllStates();
    this.getAllCities();
    this.getAllZipCodes();
   }

   getAllCountries() {
    this.countryService.getAllCountries().subscribe(c => this.countries = c);
  }
  getAllStates() {
    this.stateService.getAllStates().subscribe(s => this.states = s);
  }
  getAllCities() {
    this.cityService.getAllCities().subscribe(c => this.cities = c);
  }
  getAllZipCodes() {
    this.zipCodeService.getAllZipCodes().subscribe(z => this.zipCodes = z);
  }


  setCountryValue(country: any) {
    this.filteredStates = this.states.filter(x => x.CountryId == country.target.value);
    this.addressInfo.controls['ZipCodeId'].setValue("");
    this.filteredCities=[];
  }

  setStateValue(state: any) {
    this.filteredCities = this.cities.filter(x => x.StateId == state.target.value)
    this.addressInfo.controls['ZipCodeId'].setValue("");
  }

  setCityValue(city: any) {
    this.zipCodeId = this.zipCodes.filter(x => x.CityId == city.target.value)[0].ZipCodeId
    this.addressInfo.controls['ZipCodeId'].setValue(this.zipCodeId);
  }

  ngOnInit(): void {
    this.addressInfo = this.rootFormGroup.control.get(this.formGroupName) as FormGroup
  }

}
