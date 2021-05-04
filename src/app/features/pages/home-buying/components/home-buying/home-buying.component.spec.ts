import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBuyingComponent } from './home-buying.component';

describe('HomeBuyingComponent', () => {
  let component: HomeBuyingComponent;
  let fixture: ComponentFixture<HomeBuyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBuyingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
