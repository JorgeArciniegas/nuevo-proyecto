import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { TextField } from 'tns-core-modules/ui/text-field';
import { TYPELOGIN } from './login.model';
import { Switch } from 'tns-core-modules/ui/switch/switch';
import { VERSION } from '../../environments/version';
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
  versionSoftware = VERSION;
  /**
   * Select a different type login
   * When connectByOperator = true, typeLoginSelected = "Admin" viceversa is "Operator"
   *
   **/
  connectByOperator: boolean;
  typeLogin: typeof TYPELOGIN = TYPELOGIN;
  typeLoginSelected: TYPELOGIN;
  constructor(private userService: UserService) {
    this.showOperatorLogin = this.userService.isAdminExist();
    this.setDataTypeConnection(this.showOperatorLogin);
  }

  public onSubmit(username: string, password: string): void {
    if (!this.showOperatorLogin || !this.connectByOperator) {
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


  public changeConnectType(args): void {
    const mySwitch = args.object as Switch;
    const isChecked = mySwitch.checked; // boolean
    this.setDataTypeConnection(isChecked);
  }

  private setDataTypeConnection(isSelection: boolean): void {
    this.connectByOperator = isSelection;
    this.typeLoginSelected = isSelection ? TYPELOGIN.OPERATOR : TYPELOGIN.ADMIN;
  }
}
