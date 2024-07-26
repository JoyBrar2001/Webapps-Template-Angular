import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  storeControl = new FormControl('');

  selectedStore: string | null = "";
  allStores: string[] = ["Guest"];
  territoryId: string = "";
  contestId: number = 4;
  loading: boolean = true;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private storeService: StoreService) { }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.territoryId = params['territory_id'] || '';
    });
    
    this.storeControl.valueChanges.subscribe(value => {
      this.selectedStore = value;
    });

    if(this.territoryId !== ""){
      this.storeService.getStores(this.territoryId).subscribe(
        (data) => {
          this.allStores = data.locationNames;
          this.allStores.push("Guest");
        }
      );
    }
    
    this.loading = false;
  }

  startPlaying(): void {
    this.router.navigate([`/quiz`], {
      queryParams: {
        territory_id: this.territoryId,
        contest_id: this.contestId,
        store_name: this.selectedStore,
      }
    });
  }
}
