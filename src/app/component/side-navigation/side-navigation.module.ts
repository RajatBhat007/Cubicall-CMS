import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationRoutingModule } from './side-navigation-routing.module';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { GameThemeComponent } from './game-theme/game-theme.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { RtuScreenComponent } from './rtu-screen/rtu-screen.component';
import { SetupComponent } from './setup/setup.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SideNavigationComponent,
  
    GameThemeComponent,
       EditQuestionComponent,
       RtuScreenComponent,
       SetupComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SideNavigationRoutingModule
  ]
})
export class SideNavigationModule { }
