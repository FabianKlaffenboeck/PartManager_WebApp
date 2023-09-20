import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ManufacturerModel} from "../../service/models/Manufacturer.model";
import {PartTypeModel} from "../../service/models/PartType.model";
import {MatDialog} from "@angular/material/dialog";
import {ManufacturerService} from "../../service/data/Manufacturer.service";
import {AlertServility, NotificationService} from "../../service/notification.service";
import {ManufacturerDialogComponent} from "../../dialogues/manufacturer-dialog/manufacturer-dialog.component";
import {PartTypeService} from "../../service/data/PartType.service";
import {PartTypeDialogComponent} from "../../dialogues/partType-dialog/partType-dialog.component";
import {ShelfService} from "../../service/data/Shelf.service";
import {ShelfModel} from "../../service/models/Shelf.model";
import {ShelfDialogComponent} from "../../dialogues/shelf-dialog/shelf-dialog.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'property-selector',
  templateUrl: './property-selector.component.html',
  styleUrls: ['./property-selector.component.scss']
})

export class PropertySelectorComponent implements OnInit {

  manufacturers: ManufacturerModel[] = []
  partTypes: PartTypeModel[] = []
  shelfs: ShelfModel[] = []

  manufacturerControl = new FormControl();
  partTypesControl = new FormControl();

  filteredManufacturers: ManufacturerModel[] = []
  filteredPartTypes: PartTypeModel[] = []

  manufacturerFilterControl = new FormControl<string>('');
  partTypeFilterControl = new FormControl<string>('');

  @Output() selectedManufacturers: EventEmitter<ManufacturerModel[]> = new EventEmitter();
  @Output() selectedPartTypes: EventEmitter<PartTypeModel[]> = new EventEmitter();

  constructor(public dialog: MatDialog,
              public manufacturerService: ManufacturerService,
              public partTypeService: PartTypeService,
              public shelfService: ShelfService,
              public notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.manufacturerService.get().subscribe(it => this.filteredManufacturers = this.manufacturers = it)
    this.partTypeService.get().subscribe(it => this.filteredPartTypes = this.partTypes = it)
    this.shelfService.get().subscribe(it => this.shelfs = it)

    this.manufacturerControl.valueChanges.subscribe(it => this.selectedManufacturers.next(it))
    this.partTypesControl.valueChanges.subscribe(it => this.selectedPartTypes.next(it))

    this.manufacturerFilterControl.valueChanges.subscribe(it => this.filterManufacturers(it));
    this.partTypeFilterControl.valueChanges.subscribe(it => this.filterPartTypes(it));
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
          this.notificationService.snackbar(AlertServility.SUCCESS, "saving was successful")
        }, error => {
          this.notificationService.snackbar(AlertServility.ERROR, "error while saving")
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
          this.notificationService.snackbar(AlertServility.SUCCESS, "saving was successful")
        }, error => {
          this.notificationService.snackbar(AlertServility.ERROR, "error while saving")
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
          this.notificationService.snackbar(AlertServility.SUCCESS, "saving was successful")
        }, error => {
          this.notificationService.snackbar(AlertServility.ERROR, "error while saving")
        })
      }
    });
  }

  filterManufacturers(search: string | null) {
    if (!this.manufacturers) {
      return;
    }

    if (!search){
      this.filteredManufacturers = this.manufacturers
      return;
    }

    this.filteredManufacturers = this.manufacturers.filter(it => it.name!!.toLowerCase().indexOf(search.toLowerCase()) > -1)
  }

  filterPartTypes(search: string | null) {
    if (!this.partTypes) {
      return;
    }

    if (!search){
      this.filteredPartTypes = this.partTypes
      return;
    }

    this.filteredPartTypes = this.partTypes.filter(it => it.name!!.toLowerCase().indexOf(search.toLowerCase()) > -1)
  }
}
