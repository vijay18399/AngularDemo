import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {}
  submitted = false;
  cities = ['bangalore', 'rajamundry', 'mumbai', 'amaravathi'];
  states = ['ap', 'mp', 'telangana', 'karnataka'];
  customerForm = this.fb.group({
    full_name: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    }),
  });
  public get addressGroup(): FormGroup {
    return this.customerForm.get('address') as FormGroup;
  }
  get cc() {
    return this.customerForm.controls;
  }
  get ac() {
    return this.addressGroup.controls;
  }
  get cityName() {
    return this.customerForm.get(['address', 'city']);
  }
  changeCity(e) {
    console.log(e.target.value);
    this.cityName.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get stateName() {
    return this.customerForm.get(['address', 'state']);
  }
  changeState(e) {
    this.stateName.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  Add() {
    this.submitted = true;
    if (this.customerForm.valid) {
      this.apiService.create(this.customerForm.value).subscribe((res) => {
        console.log(res);
        alert('Customer added  Successfully');
        this.router.navigate(['/customer', res['uid']]);
      });
    } else {
      console.log('error');
    }
    console.log(this.customerForm.value);
  }
}
