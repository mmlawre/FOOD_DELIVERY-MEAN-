import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  title = 'Inventory';
  // formName = 'Add New Product';
  hrefVal = 'http://localhost:4200';
  updatedLink = 'http://localhost:4200';

  constructor() { }

  ngOnInit() {
  }

}
