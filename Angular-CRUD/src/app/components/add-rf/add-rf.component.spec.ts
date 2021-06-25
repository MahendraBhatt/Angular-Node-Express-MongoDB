import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRfComponent } from './add-rf.component';

describe('AddRfComponent', () => {
  let component: AddRfComponent;
  let fixture: ComponentFixture<AddRfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
