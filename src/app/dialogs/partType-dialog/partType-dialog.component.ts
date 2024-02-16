import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {PartTypeModel} from "../../../../service/models/PartType.model";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './partType-dialog.component.html',
  styleUrls: ['./partType-dialog.component.scss']
})
export class PartTypeDialogComponent implements OnInit {

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
    let partType: PartTypeModel = {
      id: undefined,
      name: this.name
    }

    if (this.config.data.model != undefined) {
      partType.id = this.config.data.model.id
    }

    this.dialogRef.close(partType);
  }
}
