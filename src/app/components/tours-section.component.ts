import { Component, Input } from '@angular/core';
import { BokunService } from '../services/bokun.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tours-section',
  imports: [CommonModule],
  template: `
    <section class="tw-relative tw-flex tw-min-h-[80vh] tw-w-full tw-max-w-[100vw] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden tw-p-6" id="tours">
            <h2 class="reveal-up tw-text-3xl max-md:tw-text-xl">
                Our Tours
            </h2>
            <div *ngFor="let tour of tours;"
                  class="reveal-up tw-flex tw-min-h-[60vh] tw-place-content-center tw-place-items-center tw-gap-[10%] max-lg:tw-flex-col max-lg:tw-gap-10">
              
              <!-- image -->
                <div class="tw-flex">
                    <div class="tw-max-h-[650px] tw-max-w-[850px] tw-overflow-hidden tw-rounded-lg tw-shadow-lg tw-shadow-[rgba(170,49,233,0.44021358543417366)]">
                        <img src="{{ tour.photos[0].url }}" alt="Photo of {{tour.name}}" class="tw-h-full tw-w-full tw-object-cover"/>
                    </div>
                </div>
                <!-- pricing -->
                <div class="tw-mt-6 tw-flex tw-max-w-[450px] tw-flex-col tw-gap-4" >
                  <div class="tw-flex tw-w-full tw-flex-col tw-place-items-center tw-p-[2%] "id="pricing">
                    <div class="tw-flex tw-flex-wrap tw-place-content-center tw-gap-8 max-lg:tw-flex-col">
                      <div class="reveal-up tw-flex tw-w-[380px] tw-flex-col tw-place-items-center tw-gap-2 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-p-8 tw-shadow-xl max-lg:tw-w-[320px]">
                      <h2 class="primary-text-color tw-text-3xl">
                      {{tour.title}}
                      </h2>
                      <h3 class="tw-text-5xl tw-font-semibold tw-text-blue-950">
                      <!-- <span class="tw-text-5xl tw-font-semibold">$ 00.00 </span> -->
                      <span class="tw-text-5xl tw-font-semibold">$ {{ tour.pricing[0].amount | number : '1.2-2' }} </span>
                      <span class="tw-text-2xl tw-text-gray-400">{{ tour.pricing[0].currency }}</span>
                      </h3>
                      <ul *ngFor="let activity of tour.itinerary" class="tw-mt-2 tw-flex tw-flex-col tw-gap-2 tw-text-lg">
                        <li class="tw-flex tw-gap-2">
                        <i class="bi bi-check-circle tw-text-green-500"></i>
                         <span>{{ activity.title }}</span>
                        </li>
                        <!-- <li class="tw-flex tw-gap-2"> 
                          <i class="bi bi-check-circle tw-text-green-500"></i>
                          2
                        </li>
                        <li class="tw-flex tw-gap-2">
                          <i class="bi bi-check-circle tw-text-green"></i>
                        3
                      </li>
                        <li class="tw-flex tw-gap-2">
                        <i class="bi bi-check-circle"></i>
                        4
                      </li>
                      <li class="tw-flex tw-gap-2">
                        <i class="bi bi-x-circle"></i>
                        5
                      </li>
                      -->
                      </ul>
                      <a
                      href="/details/{{ tour.id }}"
                      class="btn tw-mt-auto tw-p-2 tw-transition-transform tw-duration-[0.3s] hover:tw-scale-[1.02]"
                      >
                      More about it
                      </a>
                      </div>
                    </div>
                  </div>
                </div>

            </div>
            <!-- end for -->
        </section>
  `,
  styles: ``
})
export class ToursSectionComponent {
  @Input() index!: Number;
  tours: any[] = [];
    
    experienceIds = [938509, 1023241, 1037930];
    
    constructor (private bokunService: BokunService){}
  
    ngOnInit(): void {
      this.bokunService.getExperience(this.experienceIds).subscribe({
        next: (experienceData) => {
          this.tours = experienceData
          console.log(experienceData)
        }
      });
    }

}
