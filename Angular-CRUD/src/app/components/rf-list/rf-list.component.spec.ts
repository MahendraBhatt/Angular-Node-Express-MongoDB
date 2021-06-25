import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfListComponent } from './rf-list.component';

describe('RfListComponent', () => {
  let component: RfListComponent;
  let fixture: ComponentFixture<RfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
