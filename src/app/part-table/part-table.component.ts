import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {PartModel} from "../models/Part.model";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'part-table',
  templateUrl: './part-table.component.html',
  styleUrls: ['./part-table.component.scss']
})

export class PartTableComponent implements OnInit {
  @Input() parts: EventEmitter<PartModel[]> = new EventEmitter()

  @ViewChild(MatSort) sort: MatSort = new MatSort()

  displayedColumns = ['id', 'name', 'quantity', 'partType', 'manufacturer', 'tray'];
  dataSource = new MatTableDataSource<PartModel>();

  ngOnInit() {
    this.parts.subscribe(it => {
      this.dataSource = new MatTableDataSource(it);
      this.dataSource.sort = this.sort;
    })
  }
}
