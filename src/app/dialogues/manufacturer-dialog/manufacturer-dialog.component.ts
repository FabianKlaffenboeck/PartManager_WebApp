import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {ManufacturerModel} from "../../models/Manufacturer.model";
import {DialogModelData} from "../part-dialog/part-dialog.component";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './manufacturer-dialog.component.html',
})

export class ManufacturerDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModelData,
    public dialogRef: MatDialogRef<ManufacturerDialogComponent>
  ) {

    if (data.mode == "edit") {
      this.nameControl.setValue(data.model.name || null)
    }
  }

  nameControl = new FormControl('', []);

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let manufacturer: ManufacturerModel = {
      id: undefined,
      name: this.nameControl.value || undefined,
    };

    if (this.data.mode == "edit") {
      manufacturer.id = this.data.model.id
    }

    this.dialogRef.close(manufacturer);
  }
}
