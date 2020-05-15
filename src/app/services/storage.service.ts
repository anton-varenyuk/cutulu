import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private storage = window.localStorage;
  constructor() { }

  public get(key: string): string {
     return this.storage.getItem(key);
  }

  public set(key: string, value: string): void {
     this.storage.setItem(key, value);
  }

  public delete(key: string ): void {
    this.storage.removeItem(key);
  }
}
