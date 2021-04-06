import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  constructor() {}
  Layout = "all";
  LayoutText = "All Orders"
  searchTerm ='';
 
  orders = 
  [{"orderid":1, "pname":"shield",  "price":"$3.28","status":false,"uid":1111,"c_name":"Thanos"},
  {"orderid":2,  "pname":"Thanos' blade",  "price":"$0.48","status":true,"uid":1123,"c_name":"Spider Man"},
  {"orderid":3,   "pname":"Yaka Arrow",  "price":"$3.48","status":true,"uid":1111,"c_name":"Thanos"},
  {"orderid":4,   "pname":"Hela's necroswords",  "price":"$8.44","status":true,"uid":1111,"c_name":"Thanos"},
  {"orderid":5,   "pname":"Mjolnir",  "price":"$1.66","status":false,"uid":1122,"c_name":"Tony"},
  {"orderid":6,   "pname":"Stormbreaker ",  "price":"$2.02","status":false,"uid":1122,"c_name":"Tony"},
  {"orderid":7,  "pname":"Infinity Gauntlet",  "price":"$7.58","status":true,"uid":1123,"c_name":"Spider Man"},
  {"orderid":8, "pname":"The Destroyer",  "price":"$4.53","status":true,"uid":1123,"c_name":"Spider Man"},

];
  ngOnInit() {}
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
