import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { Pipeline } from '../../../_models/pipeline.model';
import { SimpleSmoothScrollService } from 'ng2-simple-smooth-scroll';

@Directive({
  selector: '[appScrollToPipelineDetails]',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ScrollToPipelineDetailsDirective implements  OnChanges , OnInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  targetElement: HTMLElement;
  father: HTMLElement;
  grandFather: HTMLElement;

  @Input() clickedPipeline: Pipeline;

  constructor(private element   : ElementRef,
              private renderer  : Renderer2,
              private smooth    : SimpleSmoothScrollService) {}


  ngOnInit(): void {
    this.targetElement =  this.element.nativeElement;
    this.father = this.renderer.parentNode(this.targetElement);
    this.grandFather = this.renderer.parentNode(this.father);
  }

  ngOnChanges() {
    setTimeout(() => {
      this.smooth.smoothScroll(500, { duration: 500, easing: 'easeInOutQuint' }, this.grandFather); // TODO :works perfectly in Firefox. not in chrome though
    } , 200)
  }


} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°





