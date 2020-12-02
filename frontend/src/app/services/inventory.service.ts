import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class InventoryService {

  public userID: string;
  authPath = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    this.userID = localStorage.getItem("currentUserID")
    // console.log("inventor userID: ", this.userID)
  }

  // Uses http.get() to load data
  getInventory() {
    this.userID = localStorage.getItem("currentUserID");
    return this.http.get(this.authPath + '/inventory/' + this.userID);
  }

  deleteItem(itemId: string) {
    this.http
      .delete(this.authPath + '/inventory/' + itemId)
      .subscribe(() => {
        console.log('Deleted: ' + itemId);
      });
    location.reload();
  }

  // Uses http.post() to post data
  addInventory(
    userID: string,
    itemName: string,
    itemCategory: string,
    price: number,
    stock: number
  )
  {
    this.http
      .post(this.authPath + '/inventory', {
        userID,
        itemName,
        itemCategory,
        price,
        stock,
      })
      .subscribe((responseData) => {
        console.log('response dta', responseData);
      });

  }
  updateInventory(
    itemID: string,
    userID: string,
    itemName: string,
    itemCategory: string,
    price: number,
    stock: number) {
      console.log('put inventory called')
        this.http.patch(this.authPath + "/inventory/"
          + itemID, {
              userID,
              itemName,
              itemCategory,
              price,
              stock, })
          .subscribe(() => {
            console.log('Updated: ' + itemID);
            this.getInventory();
          });

    }

}
