import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommutesComponent } from './commutes.component';

describe('CommutesComponent', () => {
  let component: CommutesComponent;
  let fixture: ComponentFixture<CommutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
