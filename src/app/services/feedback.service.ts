import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private headers = new HttpHeaders({
    "access_token": "access_token",
  });

  constructor(private http: HttpClient) { }

  postFeedback(results: any): Observable<any> {
    return this.http.post<any>(`https://gcptest.testexperience.site/geminiFeedback`, results, { headers: this.headers });
  }
}
