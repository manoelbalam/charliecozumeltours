import { Component } from '@angular/core';
import { MenuSectionComponent } from "./menu-section.component";
import { HeroSectionComponent } from "./hero-section.component";
// import { TourListComponent } from "./tour/tour-list.component";
import { ToursSectionComponent } from "./tours-section.component";

@Component({
  selector: 'app-landing-page',
  imports: [MenuSectionComponent, HeroSectionComponent, ToursSectionComponent],
  template: `
    <app-menu-section></app-menu-section>
    <app-hero-section></app-hero-section>
    <!-- <app-tour-list></app-tour-list> -->
    <app-tours-section></app-tours-section>
  `,
  styles: ``
})
export class LandingPageComponent {

}
