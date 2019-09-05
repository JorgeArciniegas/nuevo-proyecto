import { Injectable } from '@angular/core';
import { ElysApiService, VBoxConfigurations } from '@elys/elys-api';
import { ListVbox } from './vbox.model';

@Injectable({
  providedIn: 'root'
})
export class VboxService {

  listVbox: ListVbox;
  constructor(private elysApi: ElysApiService) {
    this.initLoad();
  }

  getList(): void {
    this.elysApi.virtual.getVboxConfiguration().then(
      items => {
        this.listVbox.vBoxConfigurations = items;
      }
    );
  }



  initLoad(): void {
    this.listVbox = {
      actualPages: 0,
      totalPages: 0,
      totalVboxs: 0,
      vBoxConfigurations: null
    };
  }

}
