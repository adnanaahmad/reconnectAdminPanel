import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateAgentsComponent } from './real-estate-agents.component';

describe('RealEstateAgentsComponent', () => {
  let component: RealEstateAgentsComponent;
  let fixture: ComponentFixture<RealEstateAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
