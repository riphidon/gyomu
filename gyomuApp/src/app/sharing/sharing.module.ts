import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
    declarations: [SafeHtmlPipe],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveComponentModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveComponentModule,
        ReactiveFormsModule,
        RouterModule,
        SafeHtmlPipe,
    ],
})
export class SharingModule {}
