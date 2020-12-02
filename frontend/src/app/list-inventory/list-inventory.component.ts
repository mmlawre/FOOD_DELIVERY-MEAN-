import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-list-inventory',
  templateUrl: './list-inventory.component.html',
  styleUrls: ['./list-inventory.component.css']
})
export class ListInventoryComponent implements OnInit {
 //declare variable to hold response and make it public to be accessible from components.html
 inventory;
 //initialize the call using InventoryService
 constructor(private _myService: InventoryService) {}
 ngOnInit() {
   this.getInventory();
 }

 onDelete(itemId: string) {
   this._myService.deleteItem(itemId);
 }

 //method called OnInit
 getInventory() {
   this._myService.getInventory().subscribe(
     //read data and assign to public variable inventory
     (data) => {
       this.inventory = data;
     },
     (err) => console.error(err),
     () => console.log('finished loading')
   );
 }

}
