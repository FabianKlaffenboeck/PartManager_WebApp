import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent, MessageService} from "primeng/api";
import {ShelfDialogComponent} from "./dialogs/shelf-dialog/shelf-dialog.component";
import {FootprintDialogComponent} from "./dialogs/footprint-dialog/footprint-dialog.component";
import {MeasurementUnitDialogComponent} from "./dialogs/measurementUnit-dialog/measurementUnit-dialog.component";
import {ManufacturerDialogComponent} from "./dialogs/manufacturer-dialog/manufacturer-dialog.component";
import {PartTypeDialogComponent} from "./dialogs/partType-dialog/partType-dialog.component";
import {ManufacturerService} from "../../service/data/Manufacturer.service";
import {FootprintService} from "../../service/data/Footprint.service";
import {MeasurementUnitService} from "../../service/data/MeasurementUnit.service";
import {PartTypeService} from "../../service/data/PartType.service";
import {DialogService} from "primeng/dynamicdialog";
import {ShelfService} from "../../service/data/Shelf.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  title = 'PartManager';

  constructor(
    public routerModule: Router
  ) {
  }

  ngOnInit() {

  }

  highlighterItem(path: string) {
    if(this.routerModule.url.includes(path)){
      return "background-color: gray"
    }
    return ""
  }
}
