import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDaysAgo',
})
export class FormatDaysAgoPipe implements PipeTransform {
  transform(numberOfDays: number): string {
    let finalString = '';
    if(numberOfDays >= 0) {
      if(numberOfDays === 0) { finalString = '(today)' }
      else if(numberOfDays === 1) { finalString =  '(one day ago)' }
      if(numberOfDays > 1) { finalString = `(${numberOfDays} days ago)` }
      return finalString;
    }
    else { return '(calculating ...)' }
  }

}
