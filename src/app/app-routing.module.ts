import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MyAuthGuard } from "./guards/my-auth.guard";
import { HomeComponent } from "./home/home.component";
import { CustomersComponent } from "./customers/customers.component";
import { CustomerComponent } from "./customer/customer.component";
import { OrdersComponent } from "./orders/orders.component";
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  {
    path: "",
    canActivate: [MyAuthGuard],
    canActivateChild: [MyAuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
      },
      {
        path: "customers",
        component: CustomersComponent
      },
      {
        path: "customer/:id",
        component: CustomerComponent
      },
      {
        path: "orders",
        component: OrdersComponent
      }
    ]
  },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MyAuthGuard]
})
export class AppRoutingModule {}
