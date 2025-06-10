import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BokunService } from './services/bokun.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet />
    <table>
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
    </table>
  `,
  styles: [],
})
export class AppComponent implements OnInit{
  title = 'charliecozumeltours';
  posts: any[] = [];
  photos: any[] = [];
  constructor (private bokunService: BokunService){}

  ngOnInit(): void {
    // 1023241 atv id
    const experienceId = '1023241';
    this.bokunService.getExperiencePhotos(experienceId).subscribe({
      next: (data) => {
        // console.log(data);
        this.photos = data;
      }
    });

    // this.bokunService.getTimezones().subscribe({
    //   next: (data) => {
    //     // this.posts = data;
    //     // console.log('✅ TimeZones:', data);
    //   },
    //   error: (err) => {
    //     console.error('❌ Error loading posts:', err);
    //   }
    // });
  }
}
