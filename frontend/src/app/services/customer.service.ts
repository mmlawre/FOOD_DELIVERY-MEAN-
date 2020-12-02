import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerService {

  public userID: string;
  authPath = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.userID = localStorage.getItem("userID");
    }

    // Uses http.get() to load data
  getCustomers() {
    this.userID = localStorage.getItem("currentUserID");
    console.log('get customer userID', this.userID)
    return this.http.get(this.authPath + '/customers/' + this.userID);
  }
    // Uses http.post() to post data
  addCustomers(userID: string, firstName: string, lastName: string, cardType: string, cardNumber: string, exp: string, cvc: string) {
      this.http.post(this.authPath + '/customers/', { userID, firstName, lastName, cardType, cardNumber, exp, cvc})
      .subscribe((responseData) => {
          console.log(responseData);
      });
      // location.reload();
  }

  deleteCustomer(customerId: string) {
      this.http.delete(this.authPath + "/customers/" + customerId)
        .subscribe(() => {
            console.log('Deleted: ' + customerId);
        });
        location.reload();
      }

  updateCustomer(customerId: string, userID: string, firstName: string, lastName: string, cardType: string, cardNumber: string, exp: string, cvc: string) {
      //first and last names will be send as HTTP body parameters
    this.http.patch(this.authPath + "/customers/"
        + customerId,{ userID, firstName, lastName, cardType, cardNumber, exp, cvc })
    .subscribe(() => {
        console.log('Updated: ' + customerId);
    });
  }


}
