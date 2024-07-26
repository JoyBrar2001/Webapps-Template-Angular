import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private headers = new HttpHeaders({
    "access_token": "access_token",
  });

  constructor(private http: HttpClient) { }

  getQuizQuestions(): Observable<any> {
    return this.http.get<any>(`https://quiz-questions.testexperience.site/gemini_questions_test`, { headers: this.headers });
  }

  postResults(results: any): Observable<any> {
    return this.http.post<any>(`https://gcptest.testexperience.site/getContestRewards_Store3_testing`, results, { headers: this.headers });
  }
}
