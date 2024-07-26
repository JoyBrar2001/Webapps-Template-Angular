import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  answers: (number | null)[] = [];
  results = {
    url: '',
    txt: '',
    score: 0,
  };
  showConfetti = false;

  territoryId: string = "";
  contestId: number = 0;
  storeName: string = "";

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.answers = JSON.parse(params['answers']);
        this.territoryId = params['territory_id'];
        this.contestId = params['contest_id'];
        this.storeName = params['store_name'];
      }

      this.submitResults();
      this.toggleConfetti();
    });
  }

  submitResults(): void {
    const resultsPayload = {
      contest_id: this.contestId.toString(),
      territory_id: this.territoryId,
      user: this.answers,
      store_name: this.storeName,
    };

    console.log('Submitting results payload:', resultsPayload);
    
    this.quizService.postResults(resultsPayload).subscribe(
      response => {
        this.results = response;
        console.log('Results submitted successfully:', response);
      },
      error => {
        console.error('Error submitting results:', error);
      }
    );
  }

  toggleConfetti(): void {
    setTimeout(() => {
      this.showConfetti = true;
    }, 1500);
    setTimeout(() => {
      this.showConfetti = false;
    }, 6500);
  }

  handleClick(): void {
    window.location.href = 'onehub://callback';
  }
}
