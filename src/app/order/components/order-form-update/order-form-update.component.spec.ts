import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFormUpdateComponent } from './order-form-update.component';

describe('OrderFormUpdateComponent', () => {
  let component: OrderFormUpdateComponent;
  let fixture: ComponentFixture<OrderFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderFormUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
