import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-menu-section',
  imports: [],
  template: `
    <header
            class="tw-fixed tw-top-0 tw-z-20 tw-flex tw-h-[60px] tw-w-full tw-px-[10%] max-md:tw-mr-auto md:tw-justify-around"
        >
            <div
                class="tw-absolute tw-left-0 tw-top-0 tw-z-[-1] tw-h-0 tw-w-full tw-bg-white tw-shadow-lg"
                id="expanding-header-bg"
                #expandingHeaderBg
            >
                <!-- expands the white background as scroll -->
            </div>

            <div class="tw-h-[50px] tw-w-[150px] tw-p-[4px]">
                <img
                    src="images/palm-logo.png"
                    alt="logo"
                    class="tw-object tw-h-full tw-w-full"
                />
            </div>
            <div
                class="collapsible-header animated-collapse"
                #collapsedItems
                
            >
                <div
                    class="tw-flex tw-h-full tw-w-max tw-gap-5 tw-text-base tw-text-white max-md:tw-mt-[30px] max-md:tw-flex-col max-md:tw-place-items-end max-md:tw-gap-5 md:tw-mx-auto md:tw-place-items-center"
                >
                    <a class="header-links" href=""> About us </a>
                    <a class="header-links" href=""> Menus </a>
                    <a class="header-links" href=""> Contact us </a>
                    <a
                        class="header-links"
                        href=""
                        target="_blank"
                        rel="noreferrer"
                    >
                        Order online
                    </a>
                </div>
                <div
                    class="tw-flex tw-place-items-center tw-gap-[20px] tw-text-xl max-md:tw-w-full max-md:tw-place-content-center max-md:!tw-text-white"
                >
                    <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="no-referrer"
                        area-label="facebook"
                        class="header-links tw-transition-colors tw-duration-[0.3s]"
                    >
                        <i class="bi bi-facebook"></i>
                    </a>

                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="no-referrer"
                        area-label="twitter"
                        class="header-links tw-transition-colors tw-duration-[0.3s]"
                    >
                        <i class="bi bi-instagram"></i>
                    </a>
                </div>
            </div>
            <button
                class="bi bi-list tw-absolute tw-right-3 tw-top-3 tw-z-50 tw-text-3xl tw-text-white md:tw-hidden"
                (click)="toggleHeader()"
                aria-label="menu"
                #collapseBtn
            >
            </button>
        </header>
  `,
  styles: ``
})
export class MenuSectionComponent {
  RESPONSIVE_WIDTH: number = 760;
    headerWhiteBg:boolean = false
    isHeaderCollapsed: boolean = window.innerWidth < 1000

    @ViewChild('collapsedItems') collapsedItems!: ElementRef<HTMLDivElement>;
    @ViewChild('collapseBtn') collapseBtn!: ElementRef<HTMLButtonElement>;
    @ViewChild('expandingHeaderBg') expandingHeaderBg!: ElementRef<HTMLDivElement>;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        gsap.registerPlugin(ScrollTrigger)

        ScrollTrigger.create({
        // markers: true,
            onEnter: () => {
                const headerLinks = document.querySelectorAll(".header-links")
                // if (window.innerWidth > RESPONSIVE_WIDTH) {
                    headerLinks.forEach(e => {
                        // console.log(e)
                        e.classList.toggle("header-white-bg")
                    })
                // }
                if (this.isHeaderCollapsed){
                    this.collapseBtn.nativeElement.classList.add("primary-text-color")
                }
                this.headerWhiteBg = true
            },
            onEnterBack: () => {
                const headerLinks = document.querySelectorAll(".header-links")

                // if (window.innerWidth > RESPONSIVE_WIDTH) {
                    headerLinks.forEach(e => {
                        e.classList.toggle("header-white-bg")
                    })
                // }
                this.collapseBtn.nativeElement.classList.remove("primary-text-color")
                this.headerWhiteBg = false
            }
        })
    }
    
    // reparar que se cierre tocando afuera del menu
    onHeaderClickOutside(event: Event) {
        if (event.target instanceof HTMLElement) {
            const element = event.target as HTMLElement;
            console.log(element);
        }
    }
    toggleHeader() {
        if (this.isHeaderCollapsed) {
            // console.log(this.isHeaderCollapsed);
            // console.log(this.collapseHeaderItems);
            this.collapsedItems.nativeElement.classList.add("opacity-100",)
            this.collapsedItems.nativeElement.style.width = "55vw"
            this.collapseBtn.nativeElement.classList.remove("bi-list", "primary-text-color")
            this.collapseBtn.nativeElement.classList.add("bi-x")
            this.isHeaderCollapsed = false
            
            setTimeout(() => window.addEventListener("click", this.onHeaderClickOutside), 1)

        }
        else{
            this.collapsedItems.nativeElement.classList.remove("opacity-100",)
            this.collapsedItems.nativeElement.style.width = "0vw"
            this.collapseBtn.nativeElement.classList.remove("bi-x")
            this.collapseBtn.nativeElement.classList.add("bi-list")
            if (this.headerWhiteBg){
                this.collapseBtn.nativeElement.classList.add("primary-text-color")
            }
            this.isHeaderCollapsed = true
            window.removeEventListener("click", this.onHeaderClickOutside)
        }
    }
}
