import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLogScreenComponent } from './home-log-screen.component';

describe('HomeLogScreenComponent', () => {
  let component: HomeLogScreenComponent;
  let fixture: ComponentFixture<HomeLogScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLogScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLogScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
