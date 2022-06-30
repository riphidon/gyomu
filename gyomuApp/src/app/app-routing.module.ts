import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GyomuShellComponent } from './shells/gyomu-shell/gyomu-shell.component';
import { HomeShellComponent } from './shells/home-shell/home-shell.component';
import { ProjectsShellComponent } from './shells/projects-shell/projects-shell.component';

const routes: Routes = [
    {
        path: '',
        component: GyomuShellComponent,
        children: [
            { path: 'home', component: HomeShellComponent },
            { path: 'projects', component: ProjectsShellComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
