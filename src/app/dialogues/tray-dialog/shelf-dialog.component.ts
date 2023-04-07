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

    trays.push(new TrayModel({name: "LolTest1"}))
    trays.push(new TrayModel({name: "LolTest2"}))
    trays.push(new TrayModel({name: "LolTest3"}))
    trays.push(new TrayModel({name: "LolTest4"}))
    trays.push(new TrayModel({name: "LolTest5"}))
    trays.push(new TrayModel({name: "LolTest6"}))
    trays.push(new TrayModel({name: "LolTest7"}))
    trays.push(new TrayModel({name: "LolTest8"}))
    trays.push(new TrayModel({name: "LolTest9"}))
    trays.push(new TrayModel({name: "LolTest10"}))
    trays.push(new TrayModel({name: "LolTest11"}))
    trays.push(new TrayModel({name: "LolTest12"}))

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
