import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoApiService {
  baseUrl = 'https://i.ibb.co/';
  endUrl = '/image.png'

  constructor() { }

  getUrlToLogo(source: any) {
    return `${this.baseUrl}${source}`;
  }
}
