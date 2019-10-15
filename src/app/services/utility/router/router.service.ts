import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// Interface to decoupling the router function and the device.
@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private router: Router, private _location: Location) { }

  public getRouter(): Router {
    return this.router;
  }


  public getBack() {
    return this._location.back();
  }
}
