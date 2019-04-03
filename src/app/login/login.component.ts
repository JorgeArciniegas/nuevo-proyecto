import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

interface LoginForm {
  password: string;
  username: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup;

  constructor(public fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      username: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  public onSubmit(form: LoginForm): void {
    console.log(this.form);
    if (this.form.valid) {
      this.userService.login(form.username, form.password);
    }
  }
}
