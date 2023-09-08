import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // If using Material Icons
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [LoginComponent, LoaderComponent],
  imports: [CommonModule, FormsModule, MatIconModule, LoginRoutingModule],
})
export class LoginModule {}
