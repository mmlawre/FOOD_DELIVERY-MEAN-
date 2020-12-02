import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNavigationMenuComponent } from './payment-navigation-menu.component';

describe('PaymentNavigationMenuComponent', () => {
  let component: PaymentNavigationMenuComponent;
  let fixture: ComponentFixture<PaymentNavigationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentNavigationMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
