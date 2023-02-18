import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ManufacturerModel} from "../models/Manufacturer.model";
import {PartTypeModel} from "../models/PartType.model";
import {MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'property-selector',
  templateUrl: './property-selector.component.html',
  styleUrls: ['./property-selector.component.scss']
})

//TODO Add add button to selector lists

export class PropertySelectorComponent {
  @Input() manufacturers: ManufacturerModel[] | undefined
  @Input() partTypes: PartTypeModel[] | undefined

  @Output() selectedManufacturers: EventEmitter<ManufacturerModel[]> = new EventEmitter();
  @Output() selectedPartTypes: EventEmitter<PartTypeModel[]> = new EventEmitter();

  getManufacturersSelected(options: MatSelectionList) {
    let selected = options.options.filter(o => o.selected).map(o => o.value);
    this.selectedManufacturers.next(selected)
  }

  getPartTypesSelected(options: MatSelectionList) {
    let selected = options.options.filter(o => o.selected).map(o => o.value);
    this.selectedPartTypes.next(selected)
  }
}
