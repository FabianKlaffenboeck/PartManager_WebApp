import {Component, EventEmitter, OnInit} from '@angular/core';
import {ManufacturerService} from "./service/data/Manufacturer.service";
import {PartTypeService} from "./service/data/PartType.service";
import {ManufacturerModel} from "./models/Manufacturer.model";
import {PartModel} from "./models/Part.model";
import {PartTypeModel} from "./models/PartType.model";
import {PartService} from "./service/data/Part.service";
import {FootprintService} from "./service/enums/Footprint.service";
import {ShelfModel} from "./models/Shelf.model";

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
