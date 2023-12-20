import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { Housinglocation } from '../models/housinglocation';
import { HousingService } from '../services/housing.service';
import { Observable, filter, from, map, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" name="search" id="search" placeholder="Filter by city" #filter />
      <button type="button" class="primary" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results" *ngIf="(filteredLocationList$ | async) as locationList">
    <app-housing-location
      *ngFor="let housingLocation of locationList"
      [housingLocation]="housingLocation"
    ></app-housing-location>
  </section>

  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private housingService = inject(HousingService);
  private housingLocationList$: Observable<Housinglocation[]> = from(this.housingService.getAllHousingLocations());
  public filteredLocationList$: Observable<Housinglocation[]> = this.housingLocationList$;

  public async filterResults(text: string) {
    if (!text) {
      this.filteredLocationList$ = this.housingLocationList$;
    }

    this.filteredLocationList$ = this.housingLocationList$.pipe(
      map(housing => {
        return housing.filter(housingList => housingList?.city.toLowerCase().includes(text.toLowerCase()))
      })
    );
  }

}
