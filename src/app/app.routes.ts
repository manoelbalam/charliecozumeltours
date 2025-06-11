import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '' },
    { path: '', component: LandingPageComponent },
];
