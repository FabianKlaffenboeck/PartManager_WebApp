import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PartModel} from "../models/Part.model";
import {FormControl, Validators} from "@angular/forms";
import {PartTypeModel} from "../models/PartType.model";
import {ManufacturerModel} from "../models/Manufacturer.model";
import {TrayModel} from "../models/Tray.model";
import {PartTypeService} from "../service/partType.service";
import {TrayService} from "../service/tray.service";
import {ManufacturerService} from "../service/manufacturer.service";

export interface PartDialogData {
  part: PartModel;
  mode: string;
}

@Component({
  selector: 'app-part-dialog',
  templateUrl: './part-dialog.component.html',
})

export class PartDialogComponent {
  partTypes: PartTypeModel[] = []
  manufacturers: ManufacturerModel[] = []
  trays: TrayModel[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PartDialogData,
    public dialogRef: MatDialogRef<PartDialogComponent>,
    public partTypeService: PartTypeService,
    public manufacturerService: ManufacturerService,
    public trayService: TrayService,
  ) {

    partTypeService.get().subscribe(it => this.partTypes = it)
    manufacturerService.get().subscribe(it => this.manufacturers = it)
    trayService.get().subscribe(it => this.trays = it)

    if (data.mode == "edit") {
      this.nameControl.setValue(data.part.name || null)
      this.quantityControl.setValue(data.part.quantity || null)
      this.partTypeControl.setValue(data.part.partType?.id || null)
      this.manufacturerControl.setValue(data.part.manufacturer?.id || null)
      this.trayControl.setValue(data.part.tray?.id || null)
    }
  }

  nameControl = new FormControl('', [
    Validators.required,
  ]);

  quantityControl = new FormControl(0, [
    Validators.required,
  ]);

  partTypeControl = new FormControl(0, [
    Validators.required
  ]);

  manufacturerControl = new FormControl(0, [
    Validators.required
  ]);

  trayControl = new FormControl(0, [
    Validators.required
  ]);

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let part: PartModel = {
      id: undefined,
      name: this.nameControl.value || undefined,
      quantity: this.quantityControl.value || undefined,
      partType: this.partTypes.find(it => it.id == this.partTypeControl.value) || undefined,
      manufacturer: this.manufacturers.find(it => it.id == this.manufacturerControl.value) || undefined,
      tray: this.trays.find(it => it.id == this.trayControl.value) || undefined,
    };

    if (this.data.mode == "edit") {
      part.id = this.data.part.id
    }

    this.dialogRef.close(part);
  }
}
