import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

// Interface to decoupling the router function and the device.
@Injectable({
  providedIn: 'root'
})
export class RouterService {
  productSameReload: boolean;
  constructor(private router: RouterExtensions) { }

  public getRouter(): RouterExtensions {
    return this.router;
  }


  public getBack() {
    return this.router.back();
  }
}
