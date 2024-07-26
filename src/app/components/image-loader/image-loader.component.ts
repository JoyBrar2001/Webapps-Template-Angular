import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnChanges, OnDestroy {
  @Input() src!: string;
  @Input() alt: string = '';

  loaded: boolean = false;
  placeholderUrl: string = ''; // URL for your placeholder

  private img = new Image();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src'] && this.src) {
      this.loadImage(this.src);
    }
  }

  private loadImage(src: string): void {
    this.loaded = false;
    this.img.src = src;
    this.img.onload = () => this.loaded = true;
    this.img.onerror = () => this.loaded = true;
  }

  ngOnDestroy(): void {
    
  }
}
