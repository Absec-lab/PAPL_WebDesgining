import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appUpperCase]',
})
export class UpperCaseInputDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    debugger;
      const initalValue = this._el.nativeElement.value;
      this._el.nativeElement.value = initalValue.toUpperCase();
      if ( initalValue !== this._el.nativeElement.value) {
        event.stopPropagation();
      }
    }
}