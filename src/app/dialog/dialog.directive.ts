import {Directive, TemplateRef, AfterContentInit, Input, Injector} from '@angular/core';
import {DialogService} from './dialog.service';
@Directive({
  selector: '[dialog]'
})
export class DialogDirective implements AfterContentInit {
  @Input('dialog')
  public context: any;

  constructor(private ds: DialogService, private injector: Injector, private tr: TemplateRef<any>) {
  }

  public ngAfterContentInit() {
    this.ds.open(this.tr.createEmbeddedView(this.context || {}), this.injector);
  }
}
