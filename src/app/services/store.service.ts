import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private headers = new HttpHeaders({
    access_token: 'access_token'
  });

  private baseUrl = 'https://gcptest.testexperience.site/getLocationsByTerritory/?territory=';

  constructor(private http: HttpClient) { }

  getStores(territory: string): Observable<any> {
    const url = `${this.baseUrl}${territory}`;
    return this.http.get<any>(url, { headers: this.headers });
  }
}
