import {Injectable, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlanesApiService {
  private specificCategory: string  = 'plan2';
  //private baseUrl: string = 'https://my-json-server.typicode.com/Open-Source-SW56-Group-2-EcoMovil/Json-Server-EcoMovil';
  private baseUrl = 'https://app-250421124000.azurewebsites.net/api/v1'
  private http: HttpClient = inject(HttpClient);

  /**
   * @method getPlans
   * @description
   * Fetches the plans.
   * @returns An observable of the plans.
   */
  getSources() {
    return this.http.get(`${this.baseUrl}/${this.specificCategory}`);
  }

  /**
   * @method initPlans
   * @description
   * Initializes the plans.
   * @returns An observable of the plans.
   */
  initUniversities() {
    return this.getSources();
  }
}
