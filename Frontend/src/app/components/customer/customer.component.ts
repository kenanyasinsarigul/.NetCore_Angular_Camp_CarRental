import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/models/customerModel';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: CustomerModel[] = [];
  dataLoaded = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getAll().subscribe(response => {
      this.customers = response.data;
      this.dataLoaded = true;
    })
  }

}