import {NgModule} from '@angular/core';
import {AppComponent} from './app';
import {BrowserModule} from '@angular/platform-browser';
import {DialogModule} from './dialog/dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
