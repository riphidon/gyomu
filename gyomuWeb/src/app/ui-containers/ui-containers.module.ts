import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorComponent } from './event-notifiers/error/error.component';
import { SuccessComponent } from './event-notifiers/success/success.component';
import { SharingModule } from '../sharing/sharing.module';
import { TagsBoxComponent } from './tags-box/tags-box.component';

@NgModule({
    declarations: [
        MenuComponent,
        NavBarComponent,
        ErrorComponent,
        SuccessComponent,
        TagsBoxComponent,
    ],
    imports: [CommonModule, SharingModule],
    exports: [MenuComponent, NavBarComponent],
})
export class UiContainersModule {}
