import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  constructor(private router: Router, private apiService: ApiService) {}
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
    this.CustomerForm = new FormGroup({
      full_name: new FormControl(this.editData.full_name),
      address: new FormGroup({
        street: new FormControl(this.editData.address.street),
        city: new FormControl(this.editData.address.city),
        state: new FormControl(this.editData.address.state),
        zip: new FormControl(this.editData.address.zip),
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
    this.CustomerForm = new FormGroup({
      uid: new FormControl(),
      full_name: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
        zip: new FormControl(),
      }),
    });
  }
}
