import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BokunService } from './services/bokun.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  template: `
    <!-- <h1>Welcome to {{title}}!</h1> -->

    <router-outlet />
    <!-- <table>
        <thead>
            <th>Name</th>
            <th>Index</th>
        </thead>
        <tbody>
            <tr *ngFor="let photo of photos">
                <td>{{photo.id}}</td>
                <td><img src="{{photo.url }}" alt="{{photo.id }}" width="50" height="50"> </td>
            </tr>
        </tbody>
    </table> -->
  `,
  styles: [],
})
export class AppComponent implements OnInit{
  title = 'charliecozumeltours';
  itinerary: any[] = [];
  photos: any[] = [];
  duration: any[] = [];
  difficultyLevel = '';
  
  experienceIds = [938509, 1023241, 1037930];

  constructor (private bokunService: BokunService){}

  ngOnInit(): void {
    console.log(this.experienceIds[2])
    this.bokunService.getExperience(this.experienceIds).subscribe({
      next: (experienceData) => {
        // console.log(experienceData)
      }
    });
    // const experienceId = '938509';
    // this.bokunService.getExperiencePhotos(experienceId).subscribe({
    //   next: (data) => {
    //     this.photos = data.photos;
    //     this.itinerary = data.itinerary;
    //     this.difficultyLevel = data.difficultyLevel;
    //     this.duration = data.duration;
    //     // console.log(data.duration.hours);
    //     // console.log(data.itinerary);
    //   }
    // });
    // this.bokunService.getActiveExperience(this.experienceIds).subscribe({
    //   next: (data) => {
    //     console.log('bokunService.getActiveExperiences.data: ' + data);
    //   }
    // });
     

    
  }
}
