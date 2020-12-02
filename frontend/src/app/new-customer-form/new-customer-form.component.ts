import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-customer-form',
  templateUrl: './new-customer-form.component.html',
  styleUrls: ['./new-customer-form.component.css']
})
export class NewCustomerFormComponent implements OnInit {
  @Input() userID: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() cardNumber: string;
  @Input() cardType: string;
  @Input() exp: string;
  @Input() cvc: string;

  public mode = 'add'; //defualt mode
  private id: string; //customer ID

  constructor(private _myService: CustomerService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
        if (paramMap.has('_id'))
          { this.mode = 'Edit'; /*request had a parameter _id */
            this.id = paramMap.get('_id');}
        else {this.mode = 'Add';
            this.id = null; }
      });
  }

  onSubmit() {
    this.userID = localStorage.getItem("currentUserID");
    if (this.mode == 'Add')
      this._myService.addCustomers
        (
        this.userID,
        this.firstName,
        this.lastName,
        this.cardType,
        this.cardNumber,
        this.exp,
        this.cvc);
    if (this.mode == 'Edit')
        this._myService.updateCustomer
        (this.id,
        this.userID,
        this.firstName,
        this.lastName,
        this.cardType,
        this.cardNumber,
        this.exp,
        this.cvc);
    this.router.navigate(['/listCustomers']);
  }

}
