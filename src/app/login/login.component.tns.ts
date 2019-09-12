import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public errorMessage: string | undefined;
  public usernameLengthInvalid = true;
  public passwordLengthInvalid = true;
  public showOperatorLogin: boolean;
  constructor(private userService: UserService) {
    this.showOperatorLogin = this.userService.isAdminExist();
  }

  public onSubmit(username: string, password: string): void {
    if (!this.showOperatorLogin) {
      this.userService.login(username, password).then(message => (this.errorMessage = message));
    } else {
      this.userService.loginOperator(username, password).then(message => (this.errorMessage = message));
    }

  }

  public validateLength(args, name: string, minLength: number): void {
    this.errorMessage = undefined;
    let textField = <TextField>args.object;
    if (name === 'username') {
      this.usernameLengthInvalid = textField.text.length < minLength;
    } else if (name === 'password') {
      this.passwordLengthInvalid = textField.text.length < minLength;
    }
  }


  removeAdmin(): void {
    this.userService.removeDataCtd();
    this.showOperatorLogin = false;
  }
}
