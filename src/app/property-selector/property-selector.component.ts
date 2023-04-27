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
import {ShelfService} from "../service/data/Shelf.service";
import {ShelfModel} from "../models/Shelf.model";
import {ShelfDialogComponent} from "../dialogues/shelf-dialog/shelf-dialog.component";

@Component({
  selector: 'property-selector',
  templateUrl: './property-selector.component.html',
  styleUrls: ['./property-selector.component.scss']
})

export class PropertySelectorComponent implements OnInit {

  @Output() selectedManufacturers: EventEmitter<ManufacturerModel[]> = new EventEmitter();
  @Output() selectedPartTypes: EventEmitter<PartTypeModel[]> = new EventEmitter();
  @Output() selectedShelfs: EventEmitter<PartTypeModel[]> = new EventEmitter();

  manufacturers: ManufacturerModel[] = []
  partTypes: PartTypeModel[] = []
  shelfs: ShelfModel[] = []

  constructor(public dialog: MatDialog,
              public manufacturerService: ManufacturerService,
              public partTypeService: PartTypeService,
              public shelfService: ShelfService,
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
    this.shelfService.get().subscribe(it => {
      this.shelfs = it
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

  getShelfsSelected(options: MatSelectionList) {
    let selected = options.options.filter(o => o.selected).map(o => o.value);
    this.selectedShelfs.next(selected)
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

  addShelf() {
    this.dialog.open(ShelfDialogComponent, {
      data: {
        mode: "add"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.shelfService.save(result).subscribe(saved => {
          this.shelfs?.push(saved)
          this.notificationService.success("add", saved.name)
        }, error => {
          this.notificationService.error()
        })
      }
    });
  }
}
