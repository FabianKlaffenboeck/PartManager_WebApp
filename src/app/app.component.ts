import {Component, EventEmitter, OnInit} from '@angular/core';
import {ManufacturerService} from "./service/manufacturer.service";
import {PartTypeService} from "./service/partType.service";
import {ShelfService} from "./service/shelf.service";
import {TrayService} from "./service/tray.service";
import {ManufacturerModel} from "./models/Manufacturer.model";
import {PartModel} from "./models/Part.model";
import {PartTypeModel} from "./models/PartType.model";
import {PartService} from "./service/part.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PartManagerWebApp';

  manufacturers: ManufacturerModel[] = []
  partTypes: PartTypeModel[] = []
  parts: PartModel[] = []
  partsEvent: EventEmitter<PartModel[]> = new EventEmitter()

  constructor(
    public manufacturerService: ManufacturerService,
    public partTypeService: PartTypeService,
    public partService: PartService,
    public shelfService: ShelfService,
    public trayService: TrayService,
  ) {
  }

  ngOnInit() {
    this.manufacturerService.get().subscribe(it => {
      this.manufacturers = it
      // console.table(it)
    })
    this.partTypeService.get().subscribe(it => {
      this.partTypes = it
      // console.table(it)
    })
    this.partService.get().subscribe(it => {
      this.parts = it
      this.partsEvent.next(it)
      // console.table(it)
    })
    this.shelfService.get().subscribe(it => {
      // console.table(it)
    })
    this.trayService.get().subscribe(it => {
      // console.table(it)
    })
  }

  updateSelectedManufacturers(event: ManufacturerModel[]) {
    let selectedParts: PartModel[] = this.parts

    if (event.length != 0) {
      selectedParts = []
      event.forEach(selected => {
        this.parts.filter(it => it.manufacturer?.name === selected.name).map(item => selectedParts.push(item))
      })
    }
    this.partsEvent.next(selectedParts)
  }

  updateSelectedPartTypes(event: PartTypeModel[]) {
    let selectedParts: PartModel[] = this.parts

    if (event.length != 0) {
      selectedParts = []
      event.forEach(selected => {
        this.parts.filter(it => it.partType?.type === selected.type).map(item => selectedParts.push(item))
      })
    }
    this.partsEvent.next(selectedParts)
  }

}
