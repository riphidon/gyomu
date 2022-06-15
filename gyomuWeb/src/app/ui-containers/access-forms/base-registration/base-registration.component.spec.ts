import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRegistrationComponent } from './base-registration.component';

describe('BaseRegistrationComponent', () => {
  let component: BaseRegistrationComponent;
  let fixture: ComponentFixture<BaseRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
