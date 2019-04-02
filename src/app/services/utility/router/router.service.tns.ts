import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

// Interface to decoupling the router function and the device.
@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private router: RouterExtensions) {}

  public getRouter(): RouterExtensions {
    return this.router;
  }
}
