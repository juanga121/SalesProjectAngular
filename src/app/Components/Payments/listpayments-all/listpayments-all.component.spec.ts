import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpaymentsAllComponent } from './listpayments-all.component';

describe('ListpaymentsAllComponent', () => {
  let component: ListpaymentsAllComponent;
  let fixture: ComponentFixture<ListpaymentsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListpaymentsAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListpaymentsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
