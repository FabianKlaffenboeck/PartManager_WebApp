import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {PartTypeModel} from "../../../../service/models/PartType.model";
import {ManufacturerModel} from "../../../../service/models/Manufacturer.model";
import {TrayModel} from "../../../../service/models/Tray.model";
import {ShelfModel} from "../../../../service/models/Shelf.model";
import {PartModel} from "../../../../service/models/Part.model";
import {PartTypeService} from "../../../../service/data/PartType.service";
import {ManufacturerService} from "../../../../service/data/Manufacturer.service";
import {TrayService} from "../../../../service/data/Tray.service";
import {ShelfService} from "../../../../service/data/Shelf.service";
import {PartService} from "../../../../service/data/Part.service";
import {FootprintModel} from "../../../../service/models/Footprint.model";
import {FootprintService} from "../../../../service/data/Footprint.service";
import {MeasurementUnitService} from "../../../../service/data/MeasurementUnit.service";
import {MeasurementUnitModel} from "../../../../service/models/MeasurementUnit.model";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './part-dialog.component.html',
  styleUrls: ['./part-dialog.component.scss']
})
export class PartDialogComponent implements OnInit {

  partTypes: PartTypeModel[] = []
  manufacturers: ManufacturerModel[] = []
  trays: TrayModel[] = []
  measurementUnits: MeasurementUnitModel[] = []
  footprints: FootprintModel[] = []
  shelfs: ShelfModel[] = []
  parts: PartModel[] = []

  name: any;
  quantity: any;
  measurementUnit: any;
  value: any;
  footprint: any;
  partType: any;
  manufacturer: any;
  tray: any;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public partTypeService: PartTypeService,
    public manufacturerService: ManufacturerService,
    public trayService: TrayService,
    public measurementUnitService: MeasurementUnitService,
    public shelfService: ShelfService,
    public footprintService: FootprintService,
    public partService: PartService,
  ) {
    partTypeService.get().subscribe(it => this.partTypes = it)
    manufacturerService.get().subscribe(it => this.manufacturers = it)
    trayService.get().subscribe(it => this.trays = it)
    measurementUnitService.get().subscribe(it => this.measurementUnits = it)
    footprintService.get().subscribe(it => this.footprints = it)
    shelfService.get().subscribe(it => this.shelfs = it)
    partService.get().subscribe(it => this.parts = it)
  }

  ngOnInit() {
    if (this.config.data.model != undefined) {
      this.name = this.config.data.model.name
      this.quantity = this.config.data.model.quantity
      this.measurementUnit = this.config.data.model.measurementUnit
      this.value = this.config.data.model.value
      this.footprint = this.config.data.model.footprint
      this.partType = this.config.data.model.partType
      this.manufacturer = this.config.data.model.manufacturer
      this.tray = this.config.data.model.tray
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    let part: PartModel = {
      id: undefined,
      name: this.name,
      quantity: this.quantity,
      measurementUnit: this.measurementUnit,
      value: this.value,
      footprint: this.footprint,
      partType: this.partType,
      manufacturer: this.manufacturer,
      tray: this.tray,
    };

    if (this.config.data.model != undefined) {
      part.id = this.config.data.model.id
    }

    this.dialogRef.close(part);
  }

  mapTrayShelf(tray: TrayModel): string {
    let shelfName = this.shelfs.find(shelf => shelf.trays?.find(it => it.id == tray.id))?.name || ""
    return shelfName + "-" + tray.name
  }
}
