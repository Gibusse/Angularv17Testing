import { Component, Input } from '@angular/core';
import { Housinglocation } from '../models/housinglocation';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a [routerLink]="['/details', housingLocation.id]" class="housingLink">
      <section class="listing">
        <img
          [src]="housingLocation.photo"
          alt="Exterior photo of {{ housingLocation.name }}"
          class="listing-photo"
          crossorigin
        />
      </section>
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city }} , {{ housingLocation.state }}</p>
    </a>
  `,
  styleUrls: ['./housing-location.component.scss']
})
export class HousingLocationComponent {
  @Input() housingLocation!: Housinglocation;
}
