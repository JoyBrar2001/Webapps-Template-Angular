import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss']
})
export class SurveyPageComponent implements OnInit {
  territoryId: string = "";
  contestId: string = "";
  storeName: string = "";
  answers: (number | null)[] = [];

  loading: boolean = true;
  results: number = 0;

  responses = {
    understanding: null as number | null,
    recommendation: null as number | null,
  };

  isSubmitted = false;

  constructor(private feedbackService: FeedbackService, private activatedRoute: ActivatedRoute, private quizService: QuizService, private router: Router) { }

  selectOption(question: 'understanding' | 'recommendation', value: number): void {
    this.responses[question] = value;
  }

  submitSurvey(): void {
    const payload = {
      territory_id: this.territoryId,
      store_name: this.storeName,
      user_points: 0,
      feedback1: this.responses.understanding,
      feedback2: this.responses.recommendation,
    }
    console.log(payload);

    this.feedbackService.postFeedback(payload).subscribe(
      response => {
        console.log('Results submitted successfully:', response);
      },
      error => {
        console.error('Error submitting results:', error);
      }
    );

    this.router.navigate(['/result'], {
      queryParams: {
        results: this.results,
      }
    });
  }

  getButtonColor(value: number): string {
    const colors: { [key: number]: string } = {
      1: '#FF766A',
      2: '#FF9990',
      3: '#FDD138',
      4: '#A4DA97',
      5: '#7AC767'
    };
    return colors[value] || '#FFFFFF';
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.territoryId = params['territory_id'] || '';
      this.contestId = params['contest_id'];
      this.storeName = params['store_name'];
      this.answers = JSON.parse(params['answers']);
    });

    console.log({
      contest_id: this.contestId,
      territory_id: this.territoryId,
      user: this.answers,
      store_name: this.storeName,
    });


    this.quizService.postResults({
      contest_id: this.contestId,
      territory_id: this.territoryId,
      user: this.answers,
      store_name: this.storeName,
    }).subscribe(
      response => {
        this.results = response;
        console.log('Results submitted successfully:', response);
      },
      error => {
        console.error('Error submitting results:', error);
      }
    );

    this.loading = false;
  }
}
