import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsIconButtonComponent } from './abs-icon-button.component';

describe('AbsIconButtonComponent', () => {
  let component: AbsIconButtonComponent;
  let fixture: ComponentFixture<AbsIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsIconButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
