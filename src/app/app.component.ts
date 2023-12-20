import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, HomeComponent, RouterModule],
  template: `
    <a [routerLink]="['/']">
      <header class="brand-name">
        <img src="assets/logo.svg" alt="logo" aria-hidden="true" class="brand-logo">
      </header>
    </a>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularDev';
}
