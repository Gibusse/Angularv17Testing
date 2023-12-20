import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Housinglocation } from '../../models/housinglocation';
import { HousingService } from '../../services/housing.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template:`
    <article *ngIf="(housingLocation | async) as location">
      <img
        class="listing-photo"
        [src]="location?.photo"
        alt="Exterior photo of {{ location?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ location?.name }}</h2>
        <p class="listing-location">{{ location?.city }}</p>
      </section>
      <section class="listing-feature">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ location?.availableUnits }}</li>
          <li>Does this location have wifi: {{ location?.wifi }}</li>
          <li>Does this location have laundry: {{ location?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication(applyForm)">
          <label for="firstName">First Name</label>
          <input type="text" formControlName="firstName" id="firstName" />

          <label for="lastName">Last Name</label>
          <input type="text" formControlName="lastName" id="lastName" />

          <label for="email">Email</label>
          <input type="email" formControlName="email" id="email" />

          <button [disabled]="!applyForm.valid" type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private housingService = inject(HousingService);
  private formBuilder = inject(UntypedFormBuilder)
  public housingLocation: Promise<Housinglocation | undefined>;
  public applyForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]]
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  public submitApplication(form: UntypedFormGroup) {
    if (form.valid) {
      const { firstName , lastName, email } = form.value;

      this.housingService.submitApplication(firstName || '', lastName || '', email || '');

      this.applyForm.reset();
      return form.valid;
    }
    return form.valid;
  }
}
