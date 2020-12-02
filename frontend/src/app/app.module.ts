import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserService } from "./services/user.service"
import { CustomerService } from "./services/customer.service"
import { InventoryService } from "./services/inventory.service"
import { AuthInterceptorService } from './services/authInterceptor.service';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import { NewInventoryFormComponent } from './new-inventory-form/new-inventory-form.component'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { InventoryComponent } from './inventory/inventory.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentNavigationMenuComponent } from './payment-navigation-menu/payment-navigation-menu.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { NewCustomerFormComponent } from './new-customer-form/new-customer-form.component';
import { ElementModule } from './element.module'

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UpdateComponent,
    ProfileComponent,
    ProfileEditorComponent,
    ListInventoryComponent,
    NewInventoryFormComponent,
    NavigationMenuComponent,
    InventoryComponent,
    PaymentComponent,
    PaymentNavigationMenuComponent,
    ListCustomersComponent,
    NewCustomerFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    RouterModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    ElementModule,

    // SocketIoModule.forRoot(config)


  ],
  providers: [UserService,
    CustomerService,
    InventoryService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
