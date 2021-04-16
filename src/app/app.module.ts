import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { HomeComponent } from "./home/home.component";
import { CustomersComponent } from "./customers/customers.component";
import { OrdersComponent } from "./orders/orders.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { AboutComponent } from './about/about.component';
import { NgGroupByPipeModule } from 'angular-pipes';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
@NgModule({
  imports: [AppRoutingModule, BrowserModule, FormsModule,ReactiveFormsModule,NgGroupByPipeModule,HttpClientModule],
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    CustomersComponent,
    OrdersComponent,
    FilterPipe,
    SearchFilterPipe,
    AboutComponent,
    CardComponent,
    LoginComponent,
    AddCustomerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
