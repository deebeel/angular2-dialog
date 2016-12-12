import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  ViewContainerRef,
  ComponentFactory,
  EmbeddedViewRef
} from '@angular/core';
import {DialogComponent} from './dialog.component';
const stack: DialogComponent[] = [];
let globalId = 0;

@Injectable()
export class DialogService {
  private container: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {
  }

  public open<T>(viewRef: EmbeddedViewRef<T>, injector: Injector) {
    if(!this.container){
      throw Error('Dialog container has not been specified');
    }
    setTimeout(() => {
      const factory = this.cfr.resolveComponentFactory(DialogComponent);
      this.createComponent(factory, viewRef, injector);
    });

  }

  public setContainer(container: ViewContainerRef) {
    if(this.container){
      throw Error('Dialog container has been already set');
    }
    this.container = container;
  }

  public closeTop() {
    stack.pop().close();
  }

  public closeBottom() {
    stack.shift().close();
  }

  public closeAll(desc = true) {
    this.closeWhile(() => !!stack.length, desc);
  }

  public closeWhile(predicate: (d: DialogComponent)=>boolean, desc = true) {
    const direction = desc ? () => (stack.length - 1) : () => 0;
    while (predicate(stack[direction()])) {
      if (desc) {
        this.closeTop();
      } else {
        this.closeBottom();
      }
    }
  }


  private createComponent<T>(cfr: ComponentFactory<DialogComponent>,
                             viewRef: EmbeddedViewRef<T>,
                             injector: Injector) {
    const dialog = cfr.create(injector, [viewRef.rootNodes]);
    const dialogView = dialog.hostView;
    this.container.insert(dialogView);
    const dialogComponent = dialog.instance;
    dialogComponent.id = globalId;
    const sub = dialogComponent.closed.subscribe(() => {
      this.container.remove(this.container.indexOf(dialogView));
      sub.unsubscribe();
      const i = stack.indexOf(dialogComponent);
      if (i > 0) {
        stack[i - 1].active = true;
      }
    });
    stack.forEach(d => d.active = false);
    stack.push(dialogComponent);
    return dialogComponent;
  }

}

