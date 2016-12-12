import {Component, ChangeDetectionStrategy, EventEmitter, Output, Input, HostListener} from '@angular/core';

@Component({
  selector: 'trx-dialog',
  template: `
      <div class="dialog" [class.active]="active">
          <ng-content></ng-content>
      </div>
      <div  class="overlay" (click)="close()"></div>
  `,
  styles: [require('./dialog.component.css')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  @Input() id: number;
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  active = true;

  @HostListener('window:keyup.esc')
  public close() {
    this.closed.emit();
  }
}
