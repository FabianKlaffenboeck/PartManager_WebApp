import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {PartModel} from "../models/Part.model";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'part-table',
  templateUrl: './part-table.component.html',
  styleUrls: ['./part-table.component.scss']
})

export class PartTableComponent implements OnInit, AfterViewInit {
  @Input() parts: PartModel[] = []

  @ViewChild(MatSort) sort: MatSort = new MatSort()

  displayedColumns = ['id', 'name', 'quantity', 'partType', 'manufacturer', 'tray'];
  dataSource = new MatTableDataSource(this.parts);

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.parts);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
