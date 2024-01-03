import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[nonZeroOnly]',
})
export class NonZeroOnlyInputDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    debugger;
      const initalValue = this._el.nativeElement.value;
      if(parseInt(initalValue) > 0) {
        this._el.nativeElement.value = initalValue;
      } else {
        this._el.nativeElement.value = '';
        event.target.value = '';
      }
      
      if ( initalValue !== this._el.nativeElement.value) {
        event.stopPropagation();
      }
    }
}