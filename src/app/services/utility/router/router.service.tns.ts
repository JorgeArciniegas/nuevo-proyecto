import { Injectable } from '@angular/core';
import { RouterExtensions } from "@nativescript/angular";

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


  /**
   * Use only from desktop app
   */
  public callBackToBrand() {
  }
}
