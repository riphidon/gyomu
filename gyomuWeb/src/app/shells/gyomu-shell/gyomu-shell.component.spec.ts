import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyomuShellComponent } from './gyomu-shell.component';

describe('GyomuShellComponent', () => {
    let component: GyomuShellComponent;
    let fixture: ComponentFixture<GyomuShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GyomuShellComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GyomuShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
