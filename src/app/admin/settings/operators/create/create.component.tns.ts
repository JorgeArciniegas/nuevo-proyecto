import { Component, OnInit } from '@angular/core';
import { ErrorStatus } from '@elys/elys-api';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { AppSettings } from '../../../../app.settings';
import { OperatorCreteByForm } from '../operators.model';
import { OperatorsService } from '../operators.service';
import { passwordValidator } from '../password-validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  public errorMessage: string | undefined;
  public usernameLengthInvalid = true;
  public passwordLengthInvalid = true;
  public retryPasswordLengthInvalid = true;
  public passwordNotSame = true;
  isCreated: boolean;

  public operatorCreteByForm: OperatorCreteByForm;
  constructor(
    public readonly settings: AppSettings,
    private operatorService: OperatorsService
  ) {
    this.operatorCreteByForm = {username: null, password: null, confirmPassword: null};
   }

  ngOnInit() {
  }


  public onSubmit(): void {

    if (!this.usernameLengthInvalid && !this.passwordLengthInvalid && !this.retryPasswordLengthInvalid && !this.passwordNotSame) {
      this.operatorService.createNewOperator(this.operatorCreteByForm).then(
        message => {
          this.errorMessage = ErrorStatus[message.Status];
          if (message.Status === ErrorStatus.Success) {
            this.isCreated = true;
          }
        }
      );
    }

  }

  public valueChange(): void {
    this.errorMessage = undefined;
  }



  public validateLength(args, name: string, minLength: number): void {
    this.errorMessage = undefined;
    const textField = <TextField>args.object;
    if (name === 'username') {
      this.usernameLengthInvalid = textField.text.length < minLength;
      this.operatorCreteByForm.username = textField.text;
    } else if (name === 'password') {
      this.passwordLengthInvalid = textField.text.length < minLength;
      this.operatorCreteByForm.password = textField.text;
    } else if (name === 'retryPassword') {
      this.retryPasswordLengthInvalid = textField.text.length < minLength;
      this.operatorCreteByForm.confirmPassword = textField.text;
    }
  }


  samePassword(args, password: string): void  {
    const textField = <TextField>args.object;
    if ( !this.retryPasswordLengthInvalid  &&  !this.passwordLengthInvalid)  {
      this.passwordNotSame = textField.text !== password;
    }
  }

}
