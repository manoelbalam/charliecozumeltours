import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BokunService } from './services/bokun.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  template: `
    <router-outlet />
    <table>
        <thead>
          <th>id</th>
          <th>Name</th>
          <th>Itinerary</th>
        </thead>
        <tbody>
          <tr *ngFor="let d of data">
            <td>{{d.id}}</td>
            <td>{{d.title}}</td> 
            <td>{{d.itinerary}}</td> 
          </tr>
        </tbody>
    </table>
  `,
  styles: [],
})
export class AppComponent implements OnInit{
  title = 'charliecozumeltours';
  itinerary: any[] = [];
  data: any[] = [];
  photos: any[] = [];
  duration: any[] = [];
  difficultyLevel = '';
  
  experienceIds = [938509, 1023241, 1037930];

  constructor (private bokunService: BokunService){}

  ngOnInit(): void {
    this.bokunService.getExperience(this.experienceIds).subscribe({
      next: (experienceData) => {
        console.log(experienceData)
        this.data = experienceData
      }
    });
  }
}
