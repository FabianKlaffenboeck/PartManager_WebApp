import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ManufacturerModel} from "../models/Manufacturer.model";
import {PartTypeModel} from "../models/PartType.model";
import {MatSelectionList} from "@angular/material/list";
import {MatDialog} from "@angular/material/dialog";
import {ManufacturerService} from "../service/data/Manufacturer.service";
import {NotificationService} from "../service/notification.service";
import {ManufacturerDialogComponent} from "../dialogues/manufacturer-dialog/manufacturer-dialog.component";
import {PartTypeService} from "../service/data/PartType.service";
import {PartTypeDialogComponent} from "../dialogues/partType-dialog/partType-dialog.component";

@Component({
  selector: 'property-selector',
  templateUrl: './property-selector.component.html',
  styleUrls: ['./property-selector.component.scss']
})

export class PropertySelectorComponent implements OnInit {

  @Output() selectedManufacturers: EventEmitter<ManufacturerModel[]> = new EventEmitter();
  @Output() selectedPartTypes: EventEmitter<PartTypeModel[]> = new EventEmitter();

  manufacturers: ManufacturerModel[] = []
  partTypes: PartTypeModel[] = []

  constructor(public dialog: MatDialog,
              public manufacturerService: ManufacturerService,
              public partTypeService: PartTypeService,
              public notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.manufacturerService.get().subscribe(it => {
      this.manufacturers = it
    })
    this.partTypeService.get().subscribe(it => {
      this.partTypes = it
    })
  }

  getManufacturersSelected(options: MatSelectionList) {
    let selected = options.options.filter(o => o.selected).map(o => o.value);
    this.selectedManufacturers.next(selected)
  }

  getPartTypesSelected(options: MatSelectionList) {
    let selected = options.options.filter(o => o.selected).map(o => o.value);
    this.selectedPartTypes.next(selected)
  }

  addManufacturer() {
    this.dialog.open(ManufacturerDialogComponent, {
      data: {
        mode: "add"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.manufacturerService.save(result).subscribe(saved => {
          this.manufacturers?.push(saved)
          this.notificationService.success("add", saved.name)
        }, error => {
          this.notificationService.error()
        })
      }
    });
  }

  addPartType() {
    this.dialog.open(PartTypeDialogComponent, {
      data: {
        mode: "add"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.partTypeService.save(result).subscribe(saved => {
          this.partTypes?.push(saved)
          this.notificationService.success("add", saved.name)
        }, error => {
          this.notificationService.error()
        })
      }
    });
  }
}
