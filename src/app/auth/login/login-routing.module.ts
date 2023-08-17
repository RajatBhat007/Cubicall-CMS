import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SideNavigationModule } from 'src/app/component/side-navigation/side-navigation.module';
const routes: Routes = [
  { path: '', redirectTo: 'login',pathMatch:'full' },
  { path: 'login', component: LoginComponent},
  {path: 'home',loadChildren: () => import('src/app/component/side-navigation/side-navigation.module').then(m => m.SideNavigationModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
