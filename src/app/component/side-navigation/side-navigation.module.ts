import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationRoutingModule } from './side-navigation-routing.module';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { GameThemeComponent } from './game-theme/game-theme.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { RtuScreenComponent } from './rtu-screen/rtu-screen.component';
import { SetupComponent } from './setup/setup.component';
import { CmsRoleComponent } from './setup/cms-role/cms-role.component';
import { CmsUserComponent } from './setup/cms-user/cms-user.component';
import { BatchComponent } from './setup/batch/batch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationHierarchyComponent } from './setup/organization-hierarchy/organization-hierarchy.component';
import { UsersReportComponent } from './users-report/users-report.component';

@NgModule({
  declarations: [
    SideNavigationComponent,

    GameThemeComponent,
    EditQuestionComponent,
    RtuScreenComponent,
    SetupComponent,
    CmsRoleComponent,
    CmsUserComponent,
    BatchComponent,
    OrganizationHierarchyComponent,
    UsersReportComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    SideNavigationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SideNavigationModule {}
