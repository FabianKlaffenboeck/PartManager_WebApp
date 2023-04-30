import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {DialogModelData} from "../part-dialog/part-dialog.component";
import {ShelfModel} from "../../models/Shelf.model";
import {TrayModel} from "../../models/Tray.model";
import {ShelfService} from "../../service/data/Shelf.service";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './shelf-dialog.component.html',
})

export class ShelfDialogComponent {
  typeControl = new FormControl('', []);
  trayCount = new FormControl(12, []);
  shelfs: ShelfModel[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModelData,
    public dialogRef: MatDialogRef<ShelfDialogComponent>,
    public shelfService: ShelfService,
  ) {
    if (data.mode == "edit") {
      this.typeControl.setValue(data.model.name || null)
      this.trayCount.setValue(data.model.trays.count || 12)
    }
    this.shelfService.get().subscribe(it => this.shelfs = it)
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {


    let trays: TrayModel[] = []

    // @ts-ignore
    for (let i = 0; i < this.trayCount.value; i++) {
      trays.push(new TrayModel({name: String(i).padStart(3, "0")}))
    }

    if (this.typeControl.value?.length == 0) {

      let numAbbr: (num: number) => string;
      numAbbr = (num: number) => num <= 0 ? '' : numAbbr(Math.floor((num - 1) / 26)) + String.fromCharCode((num - 1) % 26 + 65);
      this.typeControl.setValue(String(numAbbr(this.shelfs.length+1)).padStart(4, "-"))
    }

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
