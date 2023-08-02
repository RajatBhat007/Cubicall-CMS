import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // Import these
import { Error404Component } from './pages/error-404/error404/error404.component';
import { SideNavigationModule } from './component/side-navigation/side-navigation.module';
const routes: Routes = [
  { path: '', loadChildren: () => import('./component/side-navigation/side-navigation.module').then(m => m.SideNavigationModule) },
  { path: '**', component: Error404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }], // Use the HashLocationStrategy
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
