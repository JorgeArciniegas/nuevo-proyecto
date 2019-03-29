import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { loginRouting } from './login.routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, loginRouting]
})
export class LoginModule {}
