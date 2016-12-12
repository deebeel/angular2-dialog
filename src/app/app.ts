import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: require('./app.html'),
})
export class AppComponent {
  showDialog = false;

  public openModal() {
    this.showDialog = true;
  }

}

