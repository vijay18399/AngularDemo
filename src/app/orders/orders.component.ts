import { Component, OnInit } from "@angular/core";
import { ApiService } from '../services/api.service';
import { Order } from '../interfaces/order';
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  Layout = "all";
  LayoutText = "All Orders"
  searchTerm ='';
  orders = [];
  ngOnInit() {
    this.apiService.getOrders().subscribe((data) => {
      console.log(data)
      this.orders = data;
    });
  }
  Change(){
    if(this.Layout =='all'){
      this.Layout = 'group';
      this.LayoutText = "All Orders"
    }
    else{
      this.Layout = 'all';
      this.LayoutText = "Group By Customers"
    }
  }
}
