import {Component, EventEmitter, OnInit} from '@angular/core';
import {ManufacturerService} from "./service/data/Manufacturer.service";
import {PartTypeService} from "./service/data/PartType.service";
import {ManufacturerModel} from "./service/models/Manufacturer.model";
import {PartModel} from "./service/models/Part.model";
import {PartTypeModel} from "./service/models/PartType.model";
import {PartService} from "./service/data/Part.service";
import {FootprintService} from "./service/enums/Footprint.service";
import {ShelfModel} from "./service/models/Shelf.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PartManagerWebApp';

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
