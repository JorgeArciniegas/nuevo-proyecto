import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  isAdminLogged: boolean;
  constructor(
    public userService: UserService
  ) {
    this.isAdminLogged = this.userService.isLoggedOperator();
  }
}
