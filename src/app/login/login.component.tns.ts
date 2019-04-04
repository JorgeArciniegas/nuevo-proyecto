import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public errorMessage: string | undefined;

  constructor(private userService: UserService) { }

  public onSubmit(username: string, password: string): void {
    this.userService.login(username, password).then(message => (this.errorMessage = message));
  }
}
