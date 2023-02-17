import {Component, Input, OnInit} from '@angular/core';
import {PartModel} from "../models/Part.model";

@Component({
  selector: 'part-table',
  templateUrl: './part-table.component.html',
  styleUrls: ['./part-table.component.scss']
})

export class PartTableComponent implements OnInit {
  @Input() parts: PartModel[] = []

  displayedColumns = ['id', 'name', 'quantity', 'partType', 'manufacturer', 'tray'];

  ngOnInit() {
  }

}
