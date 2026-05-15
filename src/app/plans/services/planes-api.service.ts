import {Injectable, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlanesApiService {
  private specificCategory: string  = 'plans';
  private baseUrl = `${environment.serverBasePath}`;
  private http: HttpClient = inject(HttpClient);

  getSources() {
    return this.http.get(`${this.baseUrl}/${this.specificCategory}`);
  }

  initUniversities() {
    return this.getSources();
  }
}
