import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormAddComponent } from './order-form-add.component';

describe('OrderFormAddComponent', () => {
  let component: OrderFormAddComponent;
  let fixture: ComponentFixture<OrderFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderFormAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
