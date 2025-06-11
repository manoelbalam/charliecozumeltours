import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [],
  template: `
    <section class="tw-w-full tw-h-[100vh] max-md:tw-h-[100dvh] tw-max-w-[100vw]
                     tw-flex tw-flex-col tw-overflow-hidden tw-relative"
                     id="hero-section"
                     >
        <video autoplay muted loop class="tw-object-cover tw-w-full tw-h-full">
            <source src="images/hero-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>  
        
        <div class="tw-absolute tw-left-[50%] tw-top-[50%] 
                    tw-translate-x-[-50%]
                    tw-translate-y-[-50%]  
                    tw-w-full
                    tw-flex
                    tw-flex-col
                    tw-gap-4
                    tw-p-2
                    tw-place-content-center
                    tw-place-items-center
                  tw-text-white">
            <img src="images/jeep-logo.png" 
                alt="jeepLogo" 
                class="tw-w-[150px] 
                        tw-h-[150px]
                        max-md:tw-w-[300px]
                        max-md:tw-h-[300px]
                        ">
    
            <div class="tw-flex max-md:tw-gap-[4%] tw-gap-[2%] tw-mt-3 tw-w-full tw-place-content-center">
                <a href="https://5"
                        target="_blank" rel="noreferrer"
                        class="tw-p-3 tw-px-[20px] 
                                tw-rounded-full 
                                tw-bg-primary
                                tw-text-white
                                tw-flex
                                tw-duration-[0.3s]
                                tw-transition-colors
                                hover:tw-bg-primary
                                hover:tw-text-white
                                "
                        >
                    Book Now!
                </a>
                <!-- <a href="https://maps.app.goo.gl/"
                    target="_blank" rel="noreferrer"
                    class="tw-p-3 tw-px-[20px] 
                            tw-rounded-full 
                            tw-bg-white
                            tw-text-black
                            tw-flex
                            tw-gap-2
                            tw-duration-[0.3s]
                            tw-transition-colors
                            hover:tw-bg-primary
                            hover:tw-text-white
                            "
                    >
                    <span>View on map</span> 
                    <i class="bi bi-geo-alt"></i>
                </a> -->

            </div>
        </div>      
    </section>
  `,
  styles: ``
})
export class HeroSectionComponent {

}
