import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

 title = 'Customer Payment Form';
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
