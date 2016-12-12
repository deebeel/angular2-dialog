import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './dialog.component';
import {DialogDirective} from './dialog.directive';
import {DialogService} from './dialog.service';
import {DialogOutletComponent} from './dialog-outlet.component';
@NgModule({
  imports: [CommonModule],
  entryComponents: [DialogComponent],
  declarations: [DialogDirective, DialogComponent, DialogOutletComponent],
  exports: [DialogDirective, DialogOutletComponent],
  providers: [DialogService]
})
export class DialogModule{}
