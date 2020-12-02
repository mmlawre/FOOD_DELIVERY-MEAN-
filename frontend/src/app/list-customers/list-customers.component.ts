import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  public customers;
  //initialize the call using StudentService
  constructor(private _myService: CustomerService) { }
  ngOnInit() {
    this.getCustomers();
  }
  //method called OnInit
  getCustomers() {
   this._myService.getCustomers().subscribe(
      //read data and assign to public variable students
      data => { this.customers = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
  onDelete(customerId: string) {
    this._myService.deleteCustomer(customerId);
  }

}
