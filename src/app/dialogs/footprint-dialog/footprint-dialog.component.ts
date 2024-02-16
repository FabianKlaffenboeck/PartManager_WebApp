import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FootprintModel} from "../../../../service/models/Footprint.model";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './footprint-dialog.component.html',
  styleUrls: ['./footprint-dialog.component.scss']
})
export class FootprintDialogComponent implements OnInit {

  name: any;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
  }

  ngOnInit() {
    if (this.config.data.model != undefined) {
      this.name = this.config.data.model.name
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick() {
    let footprint: FootprintModel = {
      id: undefined,
      name: this.name
    }

    if (this.config.data.model != undefined) {
      footprint.id = this.config.data.model.id
    }

    this.dialogRef.close(footprint);
  }
}
