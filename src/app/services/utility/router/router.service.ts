import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Interface to decoupling the router function and the device.
@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private router: Router) { }

  public getRouter(): Router {
    return this.router;
  }
}
