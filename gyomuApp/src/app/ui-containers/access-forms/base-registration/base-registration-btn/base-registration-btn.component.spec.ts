import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRegistrationBtnComponent } from './base-registration-btn.component';

describe('BaseRegistrationBtnComponent', () => {
    let component: BaseRegistrationBtnComponent;
    let fixture: ComponentFixture<BaseRegistrationBtnComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BaseRegistrationBtnComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseRegistrationBtnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
