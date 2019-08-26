import { Injectable } from '@angular/core';
import { ElysApiService, ListOfOperators } from '@elys/elys-api';
import { UserService } from 'src/app/services/user.service';
import { DataListOfOperators } from './operators.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  listOfOperators: DataListOfOperators;
  constructor(private userService: UserService, private elysApi: ElysApiService) {
    this.initLoad();
  }


  getListOfOperators(): void {
    this.elysApi.account.getistOfOperators(this.userService.userDetail.UserName).then(
      resp => {
       this.listOfOperators.operators = resp.listOperators;
       this.pagination();
      }
    );
  }

  createNewOperator(): void  {

  }

  deleteOperator(): void {

  }

  updateOperator(): void {

  }

  initLoad(): void {
    this.listOfOperators = {
      actualPages: 0,
      totalPages: 0,
      operators: null
    };
  }

  private pagination(): void {
    if (this.listOfOperators.operators) {
      this.listOfOperators.totalPages = (this.listOfOperators.operators.length > 0)
        ? Math.ceil( this.listOfOperators.operators.length / 10 ) :  0;
    }
  }
}
