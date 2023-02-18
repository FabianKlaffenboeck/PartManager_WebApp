import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {PropertySelectorComponent} from './property-selector/property-selector.component';
import {PartTableComponent} from './part-table/part-table.component';
import {RestApiService} from "./service/rest-api.service";
import {GraphQlApiService} from "./service/graphql-api.service";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    PropertySelectorComponent,
    PartTableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    MatPaginatorModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: RestApiService},
    {provide: GraphQlApiService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
