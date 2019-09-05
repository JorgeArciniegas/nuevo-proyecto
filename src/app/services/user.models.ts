import { AccountDetails, AccountOperatorDetails } from "@elys/elys-api";

export interface OperatorData {
  ClientId: number;
  BusinessName: string;
  isAdminLogged: boolean;
}


export interface DataUser {
  userDetail?: AccountDetails;
  operatorDetail?: AccountOperatorDetails;
}



export enum TYPE_ACCOUNT {
  ADMIN,
  OPERATOR
}
