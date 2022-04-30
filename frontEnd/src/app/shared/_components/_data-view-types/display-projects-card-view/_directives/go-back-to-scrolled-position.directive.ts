import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { SynchUIService } from '../../../../_services/synch-ui.service';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';
import { RoutingService } from '../../../../_services/routing.service';
import { concatMap, take } from 'rxjs/operators';

@Directive({
  selector: '[appGoBackToScrolledPosition]',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GoBackToScrolledPositionDirective implements OnInit{  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  private targetElement: HTMLElement;

  constructor(private synchUIService : SynchUIService,
              private element   : ElementRef,
              private smooth    : SimpleSmoothScrollService,
              private routingService : RoutingService) {}


  @HostListener("scroll", ["$event"]) onListenerTriggered(event): void {
    this.synchUIService.lastScrollTopPosition$.next(event.srcElement.scrollTop);
  }


  ngOnInit(): void {
    this.targetElement =  this.element.nativeElement;
    let scrollDown = false;

    this.routingService.previousURL$
      .pipe(
        concatMap(previousURL => {
          if(previousURL.includes('projects/details')) { scrollDown = true } else { scrollDown = false }
          return this.synchUIService.lastScrollTopPosition$
        }),
        take(1),
      ).subscribe((scrollTop: number) => {
      if(scrollDown) {
        setTimeout(() =>  this.smooth.smoothScroll(scrollTop, { duration: 500, easing: 'easeInOutQuint' }, this.targetElement), 1000)
      } else {
        this.synchUIService.lastScrollTopPosition$.next(0);
      }
    });
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
