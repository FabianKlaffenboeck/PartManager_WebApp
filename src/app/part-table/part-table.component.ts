import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {PartModel} from "../models/Part.model";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {PartService} from "../service/part.service";
import {NotificationService} from "../service/notification.service";
import {PartDialogComponent} from "../dialogues/part-dialog/part-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'part-table', templateUrl: './part-table.component.html', styleUrls: ['./part-table.component.scss']
})

// TODO add a part value such as Ohm for a specific part
// TODO add part descriptions
// TODO add part filter

export class PartTableComponent implements OnInit {
  @Input() parts: EventEmitter<PartModel[]> = new EventEmitter()

  @ViewChild(MatSort) sort: MatSort = new MatSort()

  displayedColumns = ['id', 'name', 'quantity', 'partType', 'manufacturer', 'tray', 'value', 'footprint', 'actions'];
  dataSource = new MatTableDataSource<PartModel>();

  constructor(public partService: PartService,
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
    this.dialog.open(PartDialogComponent, {
      data: {
        mode: "add"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.partService.save(result).subscribe(saved => {

          this.dataSource.data.push(saved)
          this.dataSource = new MatTableDataSource(this.dataSource.data)

          this.notificationService.success(saved.name)
        }, error => {
          this.notificationService.error()
        })
      }
    });
  }

  edit(element: PartModel) {
    this.dialog.open(PartDialogComponent, {
      data: {
        model: element, mode: "edit"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.partService.save(result).subscribe(saved => {

          let index = this.dataSource.data.findIndex(it => it.id == saved.id)
          this.dataSource.data[index] = saved
          this.dataSource = new MatTableDataSource(this.dataSource.data)

          this.notificationService.success(saved.name)
        }, error => {
          this.notificationService.error()
        })
      }
    });
  }

  delete(element: PartModel) {
    if (element.id) {
      this.partService.delete(element.id).subscribe(() => {
        this.notificationService.success(element.name)
        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(it => it.id != element.id));
      }, error => {
        this.notificationService.error()
      })
    }
  }

  unitFormator(element: PartModel) {
    if (!element.value) {
      return "-"
    }
    return element.value + " " + element.measurementUnit
  }
}
