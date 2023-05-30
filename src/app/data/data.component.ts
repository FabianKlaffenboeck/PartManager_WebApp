import {Component, OnInit} from '@angular/core';
import {ManufacturerModel} from "../models/Manufacturer.model";
import {PartTypeModel} from "../models/PartType.model";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})

export class DataComponent implements OnInit {

  selectedManufacturers: ManufacturerModel[] = []
  selectedPartTypes: PartTypeModel[] = []

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
