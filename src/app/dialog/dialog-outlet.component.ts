import {Component, ViewChild, ViewContainerRef, AfterViewInit} from '@angular/core';
import {DialogService} from './dialog.service';
@Component({
  selector: 'dialog-outlet',
  template: '<template #container></template>'
})
export class DialogOutletComponent implements AfterViewInit {

  @ViewChild('container', {read: ViewContainerRef})
  private container: ViewContainerRef;
  constructor(private ds: DialogService){}

  public ngAfterViewInit(){
    this.ds.setContainer(this.container);
  }
}
