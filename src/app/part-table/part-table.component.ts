import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {PartModel} from "../models/Part.model";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {PartService} from "../service/part.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../service/notification.service";

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
    public snackBar: MatSnackBar,
    public notificationService: NotificationService,
  ) {
  }


  ngOnInit() {
    this.parts.subscribe(it => {
      this.dataSource = new MatTableDataSource(it);
      this.dataSource.sort = this.sort;
    })
  }

  edit(element: PartModel) {
  }

  delete(element: PartModel) {
    if (element.id) {
      this.partService.delete(element.id).subscribe(success => {
        this.notificationService.success(element.name)
        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(it => it.id != element.id));
      }, error =>{
        this.notificationService.error()
      })
    }
  }

}

