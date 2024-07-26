import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { SurveyPageComponent } from './pages/survey-page/survey-page.component';

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "quiz",
    component: QuizPageComponent,
  },
  {
    path: "survey",
    component: SurveyPageComponent,
  },
  {
    path: "result",
    component: ResultPageComponent,
  },
];
