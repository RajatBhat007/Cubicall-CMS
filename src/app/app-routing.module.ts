import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // Import these
import { Error404Component } from './pages/error-404/error404/error404.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: 'home', loadChildren: () => import('./component/side-navigation/side-navigation.module').then(m => m.SideNavigationModule) },
  { path: '', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: '**', component: Error404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }], // Use the HashLocationStrategy
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
