import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { GameThemeComponent } from './game-theme/game-theme.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { RtuScreenComponent } from './rtu-screen/rtu-screen.component';
import { AuthGuard } from 'src/app/auth.guard';
import { SetupComponent } from './setup/setup.component';
import { UsersReportComponent } from './users-report/users-report.component';

import { OrganizationHierarchyComponent } from './setup/organization-hierarchy/organization-hierarchy.component';
import { CreateimgComponent } from 'src/app/createimg/createimg/createimg.component';
import { GameEditComponent } from 'src/app/gameedit/game-edit/game-edit.component';

const routes: Routes = [
  // { path: '', redirectTo: 'sidenav',pathMatch:'full' },
  {
    path: '',
    component: SideNavigationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'game-theme',
        component: GameThemeComponent,
      },
        { 
      path: 'gameedit',
       component: GameEditComponent 
      },
      {
        path: 'edit-question',
        component: EditQuestionComponent,
      },
      {
        path: 'rtu',
        component: RtuScreenComponent,
      },   { 
        path: 'createimg',
         component: CreateimgComponent 
        },
      {
        path: 'setup',
        component: SetupComponent,
      },
      {
        path: 'organization',
        component: OrganizationHierarchyComponent,
      },
      {
        path: 'users-report',
        component: UsersReportComponent,
      },
    ],
  },

  // { path: 'game-theme', component: GameThemesModule },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideNavigationRoutingModule {}
