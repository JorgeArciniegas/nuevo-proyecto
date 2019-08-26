import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


export function passwordValidator(
  control: FormControl
): { [key: string]: boolean } {
  const passwordRegexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\.])[A-Za-z\d$@!%*?&_\.]{8,15}$/;
  if (control.value && !passwordRegexp.test(control.value)) {
    return { invalidPassword: true };
  }
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    public readonly settings: AppSettings,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [null, Validators.compose([Validators.required, passwordValidator])],
      confirmPassword: [null, Validators.compose([Validators.required, this.checkPasswords])],
    });
   }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  if (group.value) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };

  }
}

}
