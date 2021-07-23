import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDynastyComponent } from './team-dynasty.component';

describe('TeamDynastyComponent', () => {
  let component: TeamDynastyComponent;
  let fixture: ComponentFixture<TeamDynastyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamDynastyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDynastyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
