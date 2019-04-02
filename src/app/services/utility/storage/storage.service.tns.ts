import { Injectable } from '@angular/core';
import * as appSettings from 'tns-core-modules/application-settings';
import { VERSION } from 'src/environments/version';

// Service to handle the functions to operate on the device storage.
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private VERSION_APP = 'versionApp';
  // version storage
  private _versionStorage: string;

  public get versionStorage(): string {
    return this._versionStorage;
  }
  public set versionStorage(value: string) {
    this._versionStorage = value;
  }

  constructor() {
    this.versionStorage = VERSION.version;
    this.checkVersionChange();
  }

  /**
   * Get data.
   * @param key key to get.
   */
  public getData(key: string): any {
    return JSON.parse(appSettings.getString(key));
  }

  /**
   * Set data.
   * @param key key to assign to the data in the device storage.
   * @param dataValue data to set.
   */
  public setData(key: string, dataValue: any): void {
    appSettings.setString(key, JSON.stringify(dataValue));
  }

  /**
   * Checking for existence of specific key.
   * @param key key to check.
   */
  public checkIfExist(key: string): boolean {
    return appSettings.hasKey(key);
  }

  /**
   * Removes all items from the device storage.
   */
  public destroy(): void {
    appSettings.clear();
  }

  /**
   * Removes one or more items from the device storage.
   * @param keys keys of the items to remove.
   */
  public removeItems(...keys: string[]): void {
    keys.forEach(key => appSettings.remove(key));
  }

  /**
   * Check if value from the storage is valid. It means that it is different the "undefine" or "null".
   * @param key keys of the items to remove.
   */
  public checkDataIsValid(key: string): boolean {
    let b: boolean;
    try {
      if (appSettings.getString(key) !== undefined || appSettings.getString(key) !== null) {
        b = true;
      } else {
        b = false;
      }
    } catch (err) {
      b = false;
    }

    return b;
  }

  /**
   * CHECK STORAGE
   * this method check if the app version is changed the storage
   * and it do update the local storage with a new version number
   */
  private checkVersionChange(): void {
    // if the versionStorage is null or is not set from Module app
    if (this.versionStorage == null) {
      return;
    }

    if (!this.checkIfExist(this.VERSION_APP)) {
      this.destroy();
      this.setData(this.VERSION_APP, this.versionStorage);
    } else {
      const oldVersionApp: string = this.getData(this.VERSION_APP);
      // major old version
      const OldMajor: number = parseInt(oldVersionApp.split('.')[0], 10);
      // major version
      const Major: number = parseInt(this.versionStorage.split('.')[0], 10);
      // minor old version
      const OldMinor: number = parseInt(oldVersionApp.split('.')[1], 10);
      // minor version
      const Minor: number = parseInt(this.versionStorage.split('.')[1], 10);

      if (OldMajor < Major || OldMinor < Minor) {
        // destroy all key from storage when the major or minor is up
        this.destroy();
        this.setData(this.VERSION_APP, this.versionStorage);
      } else if (oldVersionApp < this.versionStorage) {
        // when change only patch number version
        this.setData(this.VERSION_APP, this.versionStorage);
      }
    }
  }
}
