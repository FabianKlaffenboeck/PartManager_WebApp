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
import {FootprintService} from "../../../../service/enums/Footprint.service";
import {PartService} from "../../../../service/data/Part.service";
import {MeasurementUnitService} from "../../../../service/enums/measurement-unit.service";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './part-dialog.component.html',
  styleUrls: ['./part-dialog.component.scss']
})
export class PartDialogComponent implements OnInit {

  partTypes: PartTypeModel[] = []
  manufacturers: ManufacturerModel[] = []
  trays: TrayModel[] = []
  measurementUnits: string[] = []
  footprints: string[] = []
  shelfs: ShelfModel[] = []
  parts: PartModel[] = []

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
    console.log(this.config.data.model);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    let part: PartModel = {
      id: undefined,
      name: undefined,
      quantity: undefined,
      measurementUnit: null,
      value: null,
      footprint: null,
      partType: undefined,
      manufacturer: undefined,
      tray: undefined,
    };

    if (this.config.data.mode) {
      part.id = this.config.data.model.id
    }

    this.dialogRef.close(part);
  }
}
