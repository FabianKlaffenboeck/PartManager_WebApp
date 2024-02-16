import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TrayModel} from "../../../../service/models/Tray.model";
import {ShelfModel} from "../../../../service/models/Shelf.model";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './shelf-dialog.component.html',
  styleUrls: ['./shelf-dialog.component.scss']
})
export class ShelfDialogComponent implements OnInit {

  name: any;
  count: any;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
  }

  ngOnInit() {
    if (this.config.data.model != undefined) {
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    let trays: TrayModel[] = []

    for (let i = 0; i < this.count; i++) {
      trays.push(new TrayModel({name: String(i).padStart(3, "0")}))
    }

    let shelfModel: ShelfModel = {
      id: undefined,
      name: this.name,
      trays: trays
    };

    if (this.config.data.model != undefined) {
      shelfModel.id = this.config.data.model.id
    }

    this.dialogRef.close(shelfModel);
  }
}
