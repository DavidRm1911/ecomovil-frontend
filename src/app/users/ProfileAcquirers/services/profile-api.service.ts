import {Injectable} from '@angular/core';
import {Profile} from "../model/profile";
import {Observable} from "rxjs";
import {BaseService} from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService extends BaseService<Profile>{

  getMyProfile(): Observable<any> {
    return this.http.get(`${this.basePath}/profiles/me`);
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.basePath}/profiles`, profile); // <-- sin ID
  }

  constructor() {
    super();
    this.resourceEndPoint = '/profiles';
  }


}
