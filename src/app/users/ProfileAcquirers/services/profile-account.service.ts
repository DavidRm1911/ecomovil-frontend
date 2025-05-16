
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProfileAccountService {
  private profile: any = {};

  public addAccount(data: any): void {
    this.profile = data;
  }

  public getProfile(): any {
    return this.profile;
  }
}
