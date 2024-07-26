import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { AnswerService } from '../../services/answer.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";
import { ImageLoaderComponent } from "../../components/image-loader/image-loader.component";

interface Question {
  imageUrl: string;
  index: number;
  options: string[];
  question: string;
  correctIndex?: number; // Correct answer index
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    ImageLoaderComponent
],
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})

export class QuizPageComponent implements OnInit, OnDestroy {
  territoryId: string = "";
  contestId: string = "";
  storeName: string = "";

  quizData: Question[] = [];
  currentQuestionIndex: number = 0;
  remainingTime: number = 35;
  correctAnswerIndex: number | null = null;
  selectedOptionIndex: number | null = null;
  hasAnswered: boolean = false;
  timerSubscription: Subscription | null = null;
  answers: (number | null)[] = [];

  // loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private answerService: AnswerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.territoryId = params['territory_id'] || '';
      this.contestId = params['contest_id'];
      this.storeName = params['store_name'];
    });

    this.quizService.getQuizQuestions().subscribe(
      data => {
        this.quizData = data;
        this.answers = new Array(data.length).fill(null);
        this.loadQuestion(this.currentQuestionIndex);
        // this.loading = false;
      },
      error => {
        console.error('Failed to load quiz questions', error);
        // this.loading = false;
      }
    );
  }

  loadQuestion(index: number): void {
    console.log('Loading question index:', index);
    this.currentQuestionIndex = index;
    this.selectedOptionIndex = null;
    this.correctAnswerIndex = null;
    if (index < this.quizData.length) {
      this.startTimer();
      this.answerService.getCorrectAnswer(index + 1).subscribe(correctIndex => {
        this.correctAnswerIndex = correctIndex;
        console.log('Correct answer index:', correctIndex);
      });
    } else {
      console.log('No more questions. Redirecting to /result');
      this.navigateToSurvey();
    }
  }

  startTimer(seconds: number = 35): void {
    this.remainingTime = seconds;
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.handleTimeUp();
      }
    });
  }

  handleTimeUp(): void {
    if (!this.hasAnswered) {
      this.hasAnswered = true;
      this.startTimer(3); // Reset timer to 3 seconds
      console.log('Time up! Highlighting the correct answer.');
      
      setTimeout(() => {
        this.currentQuestionIndex++;
        this.hasAnswered = false;
        if (this.currentQuestionIndex < this.quizData.length) {
          this.loadQuestion(this.currentQuestionIndex);
        } else {
          console.log('Quiz ended. Redirecting to /result');
          this.navigateToSurvey();
        }
      }, 3000);
    }
  }

  handleOptionClick(optionIndex: number): void {
    this.selectedOptionIndex = optionIndex;
  }

  handleQuestionSubmit(selectedIndex: number | null): void {
    if (selectedIndex !== null) {
      this.hasAnswered = true;
      this.answers[this.currentQuestionIndex] = selectedIndex; // Store selected index
    } else {
      this.answers[this.currentQuestionIndex] = null; // Store null if not answered
    }
    this.resetTimerAndLoadNextQuestion();
    console.log(this.answers);
  }

  resetTimerAndLoadNextQuestion(): void {
    this.startTimer(3); // Reset timer to 3 seconds

    setTimeout(() => {
      this.currentQuestionIndex++;
      this.hasAnswered = false;
      if (this.currentQuestionIndex < this.quizData.length) {
        this.loadQuestion(this.currentQuestionIndex);
      } else {
        console.log('Quiz ended. Redirecting to /result');
        this.navigateToSurvey();
      }
    }, 3000);
  }

  navigateToSurvey(): void {
    this.router.navigate(['/survey'], {
      queryParams: {
        answers: JSON.stringify(this.answers),
        territory_id: this.territoryId,
        contest_id: this.contestId,
        store_name: this.storeName,
      }
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }
}
