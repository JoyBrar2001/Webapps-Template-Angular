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
    loadComponent: () => import('./pages/quiz-page/quiz-page.component').then((m) => m.QuizPageComponent),
  },
  {
    path: "survey",
    loadComponent: () => import('./pages/survey-page/survey-page.component').then((m) => m.SurveyPageComponent),
  },
  {
    path: "result",
    loadComponent: () => import('./pages/result-page/result-page.component').then((m) => m.ResultPageComponent),
  },
];
