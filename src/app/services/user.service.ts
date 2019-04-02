import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { VgenService } from './api/vgen.service';
import { AccountDetails } from './api/vgen.model';
import { StorageService } from './utility/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataChangedSubject: Subject<AccountDetails>;
  public userDataChanged: Observable<AccountDetails>;

  constructor(private api: VgenService, private router: Router, private storageService: StorageService) {}

  // Retrieve the current token.
  public getCurrentToken(): string {
    return this.storageService.getData('tokenData');
  }
}
