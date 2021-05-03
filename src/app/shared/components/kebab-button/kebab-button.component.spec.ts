import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KebabButtonComponent } from './kebab-button.component';

describe('KebabButtonComponent', () => {
  let component: KebabButtonComponent;
  let fixture: ComponentFixture<KebabButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KebabButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KebabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
