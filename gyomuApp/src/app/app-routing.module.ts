import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AccessShellComponent } from './shells/access-shell/access-shell.component';
import { GyomuShellComponent } from './shells/gyomu-shell/gyomu-shell.component';
import { HomeShellComponent } from './shells/home-shell/home-shell.component';
import { ProjectsShellComponent } from './shells/projects-shell/projects-shell.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: AccessShellComponent },
    {
        path: 'gyomu',
        component: GyomuShellComponent,
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: 'home',
                component: HomeShellComponent,
            },
            {
                path: 'projects',
                component: ProjectsShellComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: [AuthenticationGuard],
})
export class AppRoutingModule {}
