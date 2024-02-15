import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-part-dialog',
  templateUrl: './partType-dialog.component.html',
  styleUrls: ['./partType-dialog.component.scss']
})
export class PartTypeDialogComponent implements OnInit {

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
    this.dialogRef.close(null);
  }
}
