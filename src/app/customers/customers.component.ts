import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import { Customer } from '../interfaces/customer';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  adding = false;
  CustomerForm = null;
  constructor(private fb: FormBuilder,private router: Router, private apiService: ApiService) {}
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
  updateCustomers(){
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
  Edit(index:number) {
    this.editData = this.customers[index];
    this.CustomerForm = this.fb.group({
      full_name:  [this.editData.full_name, Validators.required],
      address: this.fb.group({
        street: [this.editData.address.street, Validators.required],
        city: [this.editData.address.city, Validators.required],
        state: [this.editData.address.state, Validators.required],
        zip: [this.editData.address.zip, Validators.required]
      }),
    });
    this.editIndex = index;
    this.editing = true;
  }
  Update() {
    this.customers[this.editIndex] = this.CustomerForm.value;
    if (this.CustomerForm.value.uid) {
      this.apiService.create(this.CustomerForm.value).subscribe(res => {
        this.updateCustomers();
      });
    } else {
      this.apiService.update(this.editData.uid,this.CustomerForm.value).subscribe(res => {
        this.updateCustomers();
      });
      this.customers[this.editIndex].uid = this.editData.uid;
      this.editData = null;
      this.editIndex = null;
    }

    this.editing = false;
    this.adding = false;
  }
  detailsOf(uid) {
    this.router.navigate(['/customer', uid]);
  }
  Add() {
    this.adding = true;
    this.editing = true;
    this.CustomerForm = this.fb.group({
      full_name:  ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
    });
  }
}
