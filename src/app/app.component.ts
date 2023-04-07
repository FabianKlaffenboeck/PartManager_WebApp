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

  manufacturers: ManufacturerModel[] = []
  partTypes: PartTypeModel[] = []
  selectedManufacturers:ManufacturerModel[] = []
  selectedPartTypes:PartTypeModel[] = []

  constructor(
    public manufacturerService: ManufacturerService,
    public partTypeService: PartTypeService,
    public partService: PartService,
  ) {
  }

  ngOnInit() {
    this.manufacturerService.get().subscribe(it => {
      this.manufacturers = it
    })

    this.partTypeService.get().subscribe(it => {
      this.partTypes = it
    })
  }

  // updateSelectedManufacturers(event: ManufacturerModel[]) {
  //   let selectedParts: PartModel[] = this.parts
  //
  //   if (event.length != 0) {
  //     selectedParts = []
  //     event.forEach(selected => {
  //       this.parts.filter(it => it.manufacturer?.name === selected.name).map(item => selectedParts.push(item))
  //     })
  //   }
  // }
  //
  // updateSelectedPartTypes(event: PartTypeModel[]) {
  //   let selectedParts: PartModel[] = this.parts
  //
  //   if (event.length != 0) {
  //     selectedParts = []
  //     event.forEach(selected => {
  //       this.parts.filter(it => it.partType?.name === selected.name).map(item => selectedParts.push(item))
  //     })
  //   }
  // }
}
