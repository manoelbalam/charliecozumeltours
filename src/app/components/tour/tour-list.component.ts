import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BokunService } from '../../services/bokun.service';

@Component({
  selector: 'app-tour-list',
  imports: [CommonModule],
  template: `
    <p>
      tour-list works!
    </p>
    <table>
        <thead>
          <!-- <th>id</th> -->
          <th>title</th>
          <th>photos</th>
          <th>itinerary</th>
          <th>pricing</th>
          <th>extras</th>
        </thead>
        <tbody>
          <tr *ngFor="let tour of tours">
            <!-- <td>{{d.id}}</td> -->
            <td>{{tour.title}}</td> 
            <td>{{tour.photos.length}}</td> 
            <td>{{tour.itinerary.length}}</td> 
            <td>{{tour.pricing.length}}</td> 
            <td>{{tour.extras.length}}</td> 
          </tr>
        </tbody>
    </table>
  `,
  styles: ``
})
export class TourListComponent implements OnInit{
  tours: any[] = [];
  
  experienceIds = [938509, 1023241, 1037930];
  
  constructor (private bokunService: BokunService){}

  ngOnInit(): void {
    this.bokunService.getExperience(this.experienceIds).subscribe({
      next: (experienceData) => {
        this.tours = experienceData
      }
    });
  }

}
