import {Component} from '@angular/core';

@Component({
  selector: 'part-table',
  templateUrl: './part-table.component.html',
  styleUrls: ['./part-table.component.scss']
})
export class PartTableComponent {
  displayedColumns = ['id', 'name', 'quantity', 'partType', 'manufacturer', 'tray'];
  dataSource = ELEMENT_DATA;
}

export interface Element {
  id: string;
  name: string;
  quantity: string;
  partType: string;
  manufacturer: string;
  tray: string;
}

const ELEMENT_DATA: Element[] = [
  {id: "test", name: "test", quantity: "test", partType: "test", manufacturer: "test", tray: "test"},
];
