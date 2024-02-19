import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MeasurementUnitModel} from "../../../../service/models/MeasurementUnit.model";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './measurementUnit-dialog.component.html',
  styleUrls: ['./measurementUnit-dialog.component.scss']
})
export class MeasurementUnitDialogComponent implements OnInit {

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
    let measurementUnit: MeasurementUnitModel = {
      id: undefined,
      name: this.name
    }

    if (this.config.data.model != undefined) {
      measurementUnit.id = this.config.data.model.id
    }


    this.dialogRef.close(measurementUnit);
  }
}
