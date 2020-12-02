import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';
import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { NewInventoryFormComponent } from './new-inventory-form/new-inventory-form.component'
import { InventoryComponent } from './inventory/inventory.component';
import { PaymentComponent } from './payment/payment.component';
import { NewCustomerFormComponent } from './new-customer-form/new-customer-form.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'listInventory', component: ListInventoryComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'addInventory', component: NewInventoryFormComponent},
  { path: 'editInventory/:_id', component: NewInventoryFormComponent},
  { path:  'payment', component:PaymentComponent },
  { path: 'listCustomers', component: ListCustomersComponent},
  { path: 'addCustomer', component: NewCustomerFormComponent},
  { path: 'editCustomer/:_id', component: NewCustomerFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
