import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationRoutingModule } from './side-navigation-routing.module';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { GameThemeComponent } from './game-theme/game-theme.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SideNavigationComponent,
  
    GameThemeComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SideNavigationRoutingModule
  ]
})
export class SideNavigationModule { }
