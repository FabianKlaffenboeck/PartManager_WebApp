import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {DialogModelData} from "../part-dialog/part-dialog.component";
import {TrayModel} from "../../models/Tray.model";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './tray-dialog.component.html',
})

export class TrayDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModelData,
    public dialogRef: MatDialogRef<TrayDialogComponent>
  ) {

    if (data.mode == "edit") {
      this.typeControl.setValue(data.model.name || null)
    }
  }

  typeControl = new FormControl('', [
    Validators.required
  ]);

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let trayModel: TrayModel = {
      id: undefined,
      name: this.typeControl.value || undefined,
    };

    if (this.data.mode == "edit") {
      trayModel.id = this.data.model.id
    }

    this.dialogRef.close(trayModel);
  }
}
