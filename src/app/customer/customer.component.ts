import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from "../interfaces/customer";
import { ApiService } from "../services/api.service";
@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  sub: any;
  id: number;
  customers = null;
  user: { uid: number; full_name: string;  address: { street: string; city: string; state: string; zip: string; }; };
 
  constructor(private apiService: ApiService,private route: ActivatedRoute, private router: Router) {
   
  }
 
 
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.apiService.getById(this.id).subscribe((data) => {
        this.user = data[0];
      });
   });
  }


}
