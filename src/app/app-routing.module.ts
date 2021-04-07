import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from "./home/home.component";
import { CustomersComponent } from "./customers/customers.component";
import { CustomerComponent } from "./customer/customer.component";
import { OrdersComponent } from "./orders/orders.component";
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';
const routes: Routes = [
  { path: "home", component: HomeComponent , canActivate : [AuthGuard] },
  { path: "about", component: AboutComponent , canActivate : [AuthGuard] },
  { path: "customers", component: CustomersComponent , canActivate : [AuthGuard] },
  { path: "customer/:id", component: CustomerComponent , canActivate : [AuthGuard] }, 
  { path: "orders", component: OrdersComponent , canActivate : [AuthGuard] },
  { path: "login", component: LoginComponent  },
  {
    path: "", component: HomeComponent , canActivate : [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
