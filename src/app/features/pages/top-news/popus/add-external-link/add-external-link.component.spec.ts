import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExternalLinkComponent } from './add-external-link.component';

describe('AddExternalLinkComponent', () => {
  let component: AddExternalLinkComponent;
  let fixture: ComponentFixture<AddExternalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExternalLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExternalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
