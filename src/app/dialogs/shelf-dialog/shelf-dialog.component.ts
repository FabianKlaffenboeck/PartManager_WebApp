import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TrayModel} from "../../../../service/models/Tray.model";
import {ShelfModel} from "../../../../service/models/Shelf.model";
import {ShelfService} from "../../../../service/data/Shelf.service";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './shelf-dialog.component.html',
  styleUrls: ['./shelf-dialog.component.scss']
})
export class ShelfDialogComponent implements OnInit {

  name: any;
  count: any;

  shelfs: ShelfModel[] = []

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public shelfService: ShelfService,
  ) {
    this.shelfService.get().subscribe(it => this.shelfs = it)
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

    if (! this.name) {
      let numAbbr: (num: number) => string;
      numAbbr = (num: number) => num <= 0 ? '' : numAbbr(Math.floor((num - 1) / 26)) + String.fromCharCode((num - 1) % 26 + 65);
      this.name = String(numAbbr(this.shelfs.length + 1)).padStart(4, "0")
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
