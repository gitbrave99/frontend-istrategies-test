import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTemplatePageComponent } from './base-template-page.component';

describe('BaseTemplatePageComponent', () => {
  let component: BaseTemplatePageComponent;
  let fixture: ComponentFixture<BaseTemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseTemplatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
