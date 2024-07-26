import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'https://quiz-questions.testexperience.site/gemini_correct_answer/Q';
  private headers = new HttpHeaders().set('access_token', 'access_token');

  constructor(private http: HttpClient) { }

  getCorrectAnswer(index: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${index}`, { headers: this.headers });
  }
}
