import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {PartTableComponent} from './part-table/part-table.component';
import {TableModule} from "primeng/table";
import {RestApiService} from "../../service/rest-api.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MenubarModule} from "primeng/menubar";

@NgModule({
  declarations: [
    AppComponent,
    PartTableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    SplitButtonModule,
    TableModule,
    ToastModule,
    MenubarModule
  ],
  providers: [
    {provide: RestApiService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
