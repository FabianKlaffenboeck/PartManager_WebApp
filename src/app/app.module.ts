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
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PartDialogComponent} from './dialogs/part-dialog/part-dialog.component';
import {DialogService} from "primeng/dynamicdialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {FootprintDialogComponent} from "./dialogs/footprint-dialog/footprint-dialog.component";
import {ManufacturerDialogComponent} from "./dialogs/manufacturer-dialog/manufacturer-dialog.component";
import {MeasurementUnitDialogComponent} from "./dialogs/measurementUnit-dialog/measurementUnit-dialog.component";
import {PartTypeDialogComponent} from "./dialogs/partType-dialog/partType-dialog.component";
import {ShelfDialogComponent} from "./dialogs/shelf-dialog/shelf-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    PartTableComponent,
    PartDialogComponent,
    FootprintDialogComponent,
    ManufacturerDialogComponent,
    MeasurementUnitDialogComponent,
    PartTypeDialogComponent,
    ShelfDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    SplitButtonModule,
    TableModule,
    ToastModule,
    MenubarModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    DialogModule
  ],
  providers: [
    MessageService,
    RestApiService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
