import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {PartModel} from "../models/Part.model";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {PartService} from "../service/part.service";
import {NotificationService} from "../service/notification.service";
import {PartDialogComponent} from "../part-dialog/part-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'part-table',
  templateUrl: './part-table.component.html',
  styleUrls: ['./part-table.component.scss']
})

export class PartTableComponent implements OnInit {
  @Input() parts: EventEmitter<PartModel[]> = new EventEmitter()

  @ViewChild(MatSort) sort: MatSort = new MatSort()

  displayedColumns = ['id', 'name', 'quantity', 'partType', 'manufacturer', 'tray', 'actions'];
  dataSource = new MatTableDataSource<PartModel>();

  constructor(
    public partService: PartService,
    public notificationService: NotificationService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.parts.subscribe(it => {
      this.dataSource = new MatTableDataSource(it);
      this.dataSource.sort = this.sort;
    })
  }

  add() {
    //TODO
  }

  edit(element: PartModel) {
    console.log(element);
    const dialogRef = this.dialog.open(PartDialogComponent, {
      data: {
        part: element,
        mode: "edit"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  delete(element: PartModel) {
    if (element.id) {
      this.partService.delete(element.id).subscribe(success => {
        this.notificationService.success(element.name)
        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(it => it.id != element.id));
      }, error => {
        this.notificationService.error()
      })
    }
  }

}
