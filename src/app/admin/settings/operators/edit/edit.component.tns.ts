import { Component, OnInit } from '@angular/core';
import { ErrorStatus } from '@elys/elys-api';
import { AppSettings } from '../../../../app.settings';
import { OperatorsService } from '../operators.service';
import { OperatorEditByForm } from '../operators.model';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public errorMessage: string | undefined;
  public passwordLengthInvalid = true;
  public retryPasswordLengthInvalid = true;
  public passwordNotSame = true;
  isEdited: boolean;
  operatorEditByForm: OperatorEditByForm =  {password: null, confirmPassword: null };
  constructor(
    public operatorService: OperatorsService,
    public readonly settings: AppSettings
  ) {
    this.isEdited = false;

  }

  ngOnInit() {}

  onSubmit(): void {
    if (!this.passwordLengthInvalid && !this.retryPasswordLengthInvalid && !this.passwordNotSame) {
      this.operatorService.updateOperator(this.operatorEditByForm.password).then(
        message => {
          this.errorMessage = ErrorStatus[message.Status];

          if (message.Status === ErrorStatus.Success) {
            this.isEdited = true;
          }
        }
      );
    }
  }


  public validateLength(args, name: string, minLength: number): void {
    this.errorMessage = undefined;
    const textField = <TextField>args.object;
    if (name === 'password') {
      this.passwordLengthInvalid = textField.text.length < minLength;
      this.operatorEditByForm.password = textField.text;
    } else if (name === 'retryPassword') {
      this.retryPasswordLengthInvalid = textField.text.length < minLength;
      this.operatorEditByForm.confirmPassword = textField.text;
    }
  }


  samePassword(args, password: string): void  {
    const textField = <TextField>args.object;
    if ( !this.retryPasswordLengthInvalid  &&  !this.passwordLengthInvalid)  {
      this.passwordNotSame = textField.text !== password;
    }
  }
}
