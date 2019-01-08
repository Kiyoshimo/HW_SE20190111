import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';//谷歌
import { HttpClientModule } from '@angular/common/http';//导入HttpClientModule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCSnU1E7UrR17Zz64FT0ICC2GFtFGNuxwA', language: 'zh-TW' }),//谷歌
    HttpClientModule, //导入HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
