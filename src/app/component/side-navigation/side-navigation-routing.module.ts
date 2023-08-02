import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { GameThemeComponent } from './game-theme/game-theme.component';

const routes: Routes = [
  { path: '', redirectTo: 'sidenav',pathMatch:'full' },
  { path: 'sidenav', component: SideNavigationComponent,
 
  children: [
    {
      path: 'game-theme',
      component: GameThemeComponent
    }
  ]
},
 
  // { path: 'game-theme', component: GameThemesModule },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideNavigationRoutingModule { }
