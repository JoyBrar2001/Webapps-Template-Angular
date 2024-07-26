import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageLoaderComponent } from "../../components/image-loader/image-loader.component";

@Component({
  selector: 'app-survey-page',
  standalone: true,
  imports: [
    CommonModule,
    ImageLoaderComponent
],
  templateUrl: './survey-page.component.html',
  styleUrl: './survey-page.component.scss'
})
export class SurveyPageComponent {
  responses = {
    understanding: null as number | null,
    recommendation: null as number | null,
  };

  isSubmitted = false;

  selectOption(question: 'understanding' | 'recommendation', value: number): void {
    this.responses[question] = value;
  }

  submitSurvey(): void {
    this.isSubmitted = true;
    console.log(this.responses);
  }

  getButtonColor(value: number): string {
    const colors: any = {
      1: '#FF766A',
      2: '#FF9990',
      3: '#FDD138',
      4: '#A4DA97',
      5: '#7AC767'
    };
    return colors[value] || '#FFFFFF';
  }
}
