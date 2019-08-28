import { Injectable } from '@angular/core';
import {
  AccountOperator,
  CreateShopOperatorResponse,
  DeleteShopOperatorRequest,
  ElysApiService,
  ErrorStatus,
  ShopOperatorRequest,
  UserStatus,
  ShopOperatorResponse
} from '@elys/elys-api';
import { UserService } from '../../../services/user.service';
import { DataListOfOperators, OperatorCreteByForm } from './operators.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  listOfOperators: DataListOfOperators;
  listTempOperators: AccountOperator[];
  rowNumber = 5;
  operatorMarked: AccountOperator;
  constructor(private userService: UserService, private elysApi: ElysApiService) {
    this.initLoad();
  }


  getListOfOperators(): void {
    this.elysApi.account.getistOfOperators().then(
      resp => {
       this.listOfOperators.operators = resp.Operators;
       this.pagination();
      }
    );
  }

  createNewOperator(operatorForm: OperatorCreteByForm): Promise<CreateShopOperatorResponse>  {
    const operator: ShopOperatorRequest =  {
      Operator: {
        IDClient: 0,
        IsBalanceEnabled: true,
        IsFullBalanceEnabled: false,
        IsLiveEnabled: false,
        IsLiveWidgetEnabled: false,
        IsPrematchEnabled: false,
        IsPrintTransactionEnabled: true,
        IsVirtualGamesEnabled: true,
        OperatorClientType: {OperatorTypeId: 1, Description: 'new operator'},
        Password: operatorForm.password,
        StakeLimit: null,
        StakeLower: null,
        UserId: this.userService.userDetail.UserId,
        UserName: operatorForm.username,
        UserStatusId: UserStatus.Enabled,
        CanFilterBetListByAnotherOperator: false,
        IsSmartCodeErrorSoundEnabled: false,
        IsSmartCodeHelperEnabled: false,
        IsSmartCodeShortcutIntellisenseEnabled: false,
        SubscriptionDate: new Date()
      }
    };
    return this.elysApi.account.createOperator(operator);
  }

  deleteOperator(): Promise<ErrorStatus> {
    const operatorReq:  DeleteShopOperatorRequest = {ClientId: this.operatorMarked.IDClient};

    return this.elysApi.account.deleteOperator(operatorReq);
  }

  updateOperator(password: string): Promise<ShopOperatorResponse> {
    this.operatorMarked.Password = password;
    const req: ShopOperatorRequest = { Operator: this.operatorMarked };
    return this.elysApi.account.updateOperator(req);
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
        ? Math.ceil( this.listOfOperators.operators.length / this.rowNumber ) :  0;

        this.filterOperators();
    }
  }


  filterOperators(): void  {
    const start = this.listOfOperators.actualPages  * this.rowNumber;
    let end = (this.listOfOperators.actualPages + 1) * this.rowNumber;
    if (end > this.listOfOperators.totalOperators )  {
      end = this.listOfOperators.totalOperators;
    }

    this.listTempOperators = this.listOfOperators.operators.slice(start, end);
  }


}
