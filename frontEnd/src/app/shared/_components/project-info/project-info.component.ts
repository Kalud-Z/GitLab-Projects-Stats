import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Project } from '../../_models/project.model';
import { projectInfoPopupTrigger } from '../../_animations/animations';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  animations : [
    projectInfoPopupTrigger,
  ],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectInfoComponent {
  @Input() projectObj: Project;
  @Output() closeProjectInfoWindow: EventEmitter<boolean> = new EventEmitter();

  @HostListener('document:click', ['$event']) onClick(event) {
    event.stopPropagation();
    console.log(event.target)
    if(event.target.className.includes('exitIconWrapper') || event.target.className.includes('projectInfoPopupBackground')) {
      this.closeProjectInfoWindow.emit(true);
    }
  }

  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
     if(event.code === 'Escape') { this.closeProjectInfoWindow.emit(true) }
  }

} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

