import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import { Customer } from '../interfaces/customer';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  submitted = false;
  cities = ['bangalore', 'rajamundry', 'mumbai', 'amaravathi'];
  states = ['ap', 'mp', 'telangana', 'karnataka'];
  adding = false;
  customerForm = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}
  term = '';
  editing = false;
  editData = null;
  editIndex = null;
  layout = 'list';
  gridClass = 'col-sm-3';
  customers = [];
  ngOnInit() {
    this.apiService.getAll().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }
  public get addressGroup(): FormGroup {
    return this.customerForm.get('address') as FormGroup;
  }
  get cc() {
    return this.customerForm.controls;
  }
  get ac() {
    return this.addressGroup.controls;
  }
  updateCustomers() {
    this.apiService.getAll().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  layoutChanger() {
    if (this.layout == 'grid') {
      this.gridClass = 'col-sm-3';
      this.layout = 'list';
    } else {
      this.gridClass = 'col-sm-12';
      this.layout = 'grid';
    }
  }
  Edit(index: number) {
    this.editData = this.customers[index];
    this.customerForm = this.fb.group({
      full_name: [this.editData.full_name, Validators.required],
      address: this.fb.group({
        street: [this.editData.address.street, Validators.required],
        city: [this.editData.address.city, Validators.required],
        state: [this.editData.address.state, Validators.required],
        zip: [this.editData.address.zip, Validators.required],
      }),
    });
    this.editIndex = index;
    this.editing = true;
  }
  Update() {
    this.submitted = true;
    if (this.customerForm.valid) {
      this.customers[this.editIndex] = this.customerForm.value;
      this.apiService
        .update(this.editData.uid, this.customerForm.value)
        .subscribe((res) => {
          alert('customer Updated Successfully');
          this.updateCustomers();
        });
      this.customers[this.editIndex].uid = this.editData.uid;
      this.editData = null;
      this.editIndex = null;
      this.editing = false;
    }
  }
  detailsOf(uid) {
    this.router.navigate(['/customer', uid]);
  }

  Back() {
    this.editing = false;
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
}
