import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {DialogModelData} from "../part-dialog/part-dialog.component";
import {ShelfModel} from "../../models/Shelf.model";
import {TrayModel} from "../../models/Tray.model";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './shelf-dialog.component.html',
})

export class ShelfDialogComponent {
  typeControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModelData,
    public dialogRef: MatDialogRef<ShelfDialogComponent>
  ) {

    if (data.mode == "edit") {
      this.typeControl.setValue(data.model.name || null)
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

    let trays: TrayModel[] = []

    trays.push(new TrayModel({name: "00"}))
    trays.push(new TrayModel({name: "01"}))
    trays.push(new TrayModel({name: "02"}))
    trays.push(new TrayModel({name: "03"}))
    trays.push(new TrayModel({name: "04"}))
    trays.push(new TrayModel({name: "05"}))
    trays.push(new TrayModel({name: "06"}))
    trays.push(new TrayModel({name: "07"}))
    trays.push(new TrayModel({name: "08"}))
    trays.push(new TrayModel({name: "09"}))
    trays.push(new TrayModel({name: "10"}))
    trays.push(new TrayModel({name: "11"}))

    let shelfModel: ShelfModel = {
      id: undefined,
      name: this.typeControl.value || undefined,
      trays: trays
    };

    if (this.data.mode == "edit") {
      shelfModel.id = this.data.model.id
    }

    this.dialogRef.close(shelfModel);
  }
}
