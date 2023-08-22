import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../../common.css', './footer.component.css']
})
export class FooterComponent {

  currentYear: any;

  ngOnInit() {
    this.currentYear = moment(new Date()).year();
  }

}
