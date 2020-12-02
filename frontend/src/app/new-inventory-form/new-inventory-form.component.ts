import { Component, OnInit, Input } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-new-inventory-form',
  templateUrl: './new-inventory-form.component.html',
  styleUrls: ['./new-inventory-form.component.css'],
})
export class NewInventoryFormComponent implements OnInit {
  @Input() userID: string;
  @Input() itemName: string;
  @Input() itemCategory: string;
  @Input() price: number;
  @Input() stock: number;
  public mode = 'add'; //default mode
  private id: string; //student ID
  constructor(private _myService: InventoryService, private router:Router,public route: ActivatedRoute) {}
  onSubmit() {
    console.log(
      'You submitted: ' +
        this.itemName +
        ' ' +
        this.itemCategory +
        ' ' +
        this.price +
        ' ' +
        this.stock
    );
    this.userID = localStorage.getItem("currentUserID");
    // this._myService.addInventory(
    //   this.itemName,
    //   this.itemCategory,
    //   this.price,
    //   this.stock
    // );
    this.router.navigate(['/listInventory']);
    if(this.mode == 'add')
      this._myService.addInventory(
        this.userID,
        this.itemName,
        this.itemCategory,
        this.price,
        this.stock);
    if(this.mode == 'edit')
      this._myService.updateInventory(
        this.id,
        this.userID,
        this.itemName,
        this.itemCategory,
        this.price,
        this.stock);

  }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {

       if (paramMap.has('_id'))
         { this.mode = 'edit'; /*request had a parameter _id */
           this.id = paramMap.get('_id');}
       else {this.mode = 'add';
           this.id = null; }
     });
  }

}
