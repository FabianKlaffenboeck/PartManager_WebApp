import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PartModel} from "../../models/Part.model";
import {FormControl, Validators} from "@angular/forms";
import {PartTypeModel} from "../../models/PartType.model";
import {ManufacturerModel} from "../../models/Manufacturer.model";
import {TrayModel} from "../../models/Tray.model";
import {PartTypeService} from "../../service/data/PartType.service";
import {TrayService} from "../../service/data/Tray.service";
import {ManufacturerService} from "../../service/data/Manufacturer.service";
import {measurementUnitService} from "../../service/enums/MeasurementUnit.service";
import {FootprintService} from "../../service/enums/Footprint.service";

export interface DialogModelData {
  model: any;
  mode: string;
}

@Component({
  selector: 'app-part-dialog', templateUrl: './part-dialog.component.html',
})

export class PartDialogComponent {
  partTypes: PartTypeModel[] = []
  manufacturers: ManufacturerModel[] = []
  trays: TrayModel[] = []
  measurementUnits: string[] = []
  footprints: string[] = []

  nameControl = new FormControl('', [Validators.required]);
  quantityControl = new FormControl(null, [Validators.required]);
  measurementUnitControl = new FormControl('', []);
  valueControl = new FormControl(null, []);
  footprintControl = new FormControl('', []);
  partTypeControl = new FormControl(0, [Validators.required]);
  manufacturerControl = new FormControl(0, [Validators.required]);
  trayControl = new FormControl(0, [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModelData,
              public dialogRef: MatDialogRef<PartDialogComponent>,
              public partTypeService: PartTypeService,
              public manufacturerService: ManufacturerService,
              public trayService: TrayService,
              public measurementUnitService: measurementUnitService,
              public footprintService: FootprintService,
              public dialog: MatDialog) {

    partTypeService.get().subscribe(it => this.partTypes = it)
    manufacturerService.get().subscribe(it => this.manufacturers = it)
    trayService.get().subscribe(it => this.trays = it)
    measurementUnitService.get().subscribe(it => this.measurementUnits = it)
    footprintService.get().subscribe(it => this.footprints = it)

    if (data.mode == "edit") {
      this.nameControl.setValue(data.model.name || null)
      this.quantityControl.setValue(data.model.quantity || null)
      this.measurementUnitControl.setValue(data.model.measurementUnit || null)
      this.valueControl.setValue(data.model.value || null)
      this.footprintControl.setValue(data.model.footprint || null)
      this.partTypeControl.setValue(data.model.partType?.id || null)
      this.manufacturerControl.setValue(data.model.manufacturer?.id || null)
      this.trayControl.setValue(data.model.tray?.id || null)
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let part: PartModel = {
      id: undefined,
      name: this.nameControl.value || undefined,
      quantity: this.quantityControl.value || undefined,
      measurementUnit: this.measurementUnitControl.value || null,
      value: this.valueControl.value || null,
      footprint: this.footprintControl.value || null,
      partType: this.partTypes.find(it => it.id == this.partTypeControl.value) || undefined,
      manufacturer: this.manufacturers.find(it => it.id == this.manufacturerControl.value) || undefined,
      tray: this.trays.find(it => it.id == this.trayControl.value) || undefined,
    };

    if (this.data.mode == "edit") {
      part.id = this.data.model.id
    }

    this.dialogRef.close(part);
  }
}
