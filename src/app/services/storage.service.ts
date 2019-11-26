import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = window.localStorage;
  constructor() { }

  public get(key: string) {
     return this.storage.getItem(key);
  }
  public set(key: string, value: string) {
    return this.storage.setItem(key, value);
  }
}
