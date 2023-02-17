import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ManufacturerModel} from "../models/Manufacturer.model";
import {PartTypeModel} from "../models/PartType.model";
import {MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'property-selector',
  templateUrl: './property-selector.component.html',
  styleUrls: ['./property-selector.component.scss']
})
export class PropertySelectorComponent {
  @Input() manufacturers: ManufacturerModel[] | undefined
  @Input() partTypes: PartTypeModel[] | undefined
  @Output() selectedManufacturers: EventEmitter<ManufacturerModel[]> = new EventEmitter();
  @Output() selectedPartTypes: EventEmitter<PartTypeModel[]> = new EventEmitter();

  ManufacturerSelected(options: MatSelectionList) {
    let selected = options.options.filter(o => o.selected).map(o => o.value);
    console.log(selected);
    this.selectedManufacturers.next(selected)
  }

  PartTypesSelected(options: MatSelectionList) {
    let selected = options.options.filter(o => o.selected).map(o => o.value);
    console.log(selected);
    this.selectedPartTypes.next(selected)
  }
}
