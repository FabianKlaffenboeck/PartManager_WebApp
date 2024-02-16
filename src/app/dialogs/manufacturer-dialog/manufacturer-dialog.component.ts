import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ManufacturerModel} from "../../../../service/models/Manufacturer.model";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './manufacturer-dialog.component.html',
  styleUrls: ['./manufacturer-dialog.component.scss']
})
export class ManufacturerDialogComponent implements OnInit {

  name: any;

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
    let manufacturer: ManufacturerModel = {
      id: undefined,
      name: this.name
    }

    if (this.config.data.model != undefined) {
      manufacturer.id = this.config.data.model.id
    }

    this.dialogRef.close(manufacturer);
  }
}
