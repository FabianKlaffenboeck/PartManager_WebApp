import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PartModel} from "../../service/models/Part.model";
import {FormControl, Validators} from "@angular/forms";
import {PartTypeModel} from "../../service/models/PartType.model";
import {ManufacturerModel} from "../../service/models/Manufacturer.model";
import {TrayModel} from "../../service/models/Tray.model";
import {PartTypeService} from "../../service/data/PartType.service";
import {TrayService} from "../../service/data/Tray.service";
import {ManufacturerService} from "../../service/data/Manufacturer.service";
import {measurementUnitService} from "../../service/enums/MeasurementUnit.service";
import {FootprintService} from "../../service/enums/Footprint.service";
import {ShelfModel} from "../../service/models/Shelf.model";
import {ShelfService} from "../../service/data/Shelf.service";
import {PartService} from "../../service/data/Part.service";

export interface DialogModelData {
  model: any;
  mode: string;
}

@Component({
  selector: 'app-part-dialog', templateUrl: './part-dialog.component.html',
})

export class PartDialogComponent {

  partTypes: PartTypeModel[] = []
  manufacturers: ManufacturerModel[] = []
  trays: TrayModel[] = []
  measurementUnits: string[] = []
  footprints: string[] = []
  shelfs: ShelfModel[] = []
  parts: PartModel[] = []

  nameControl = new FormControl('', [Validators.required]);
  quantityControl = new FormControl(null, [Validators.required]);
  measurementUnitControl = new FormControl('', []);
  valueControl = new FormControl(null, []);
  footprintControl = new FormControl('', []);
  partTypeControl = new FormControl(0, [Validators.required]);
  manufacturerControl = new FormControl(0, [Validators.required]);
  trayControl = new FormControl(0, [Validators.required]);

  filteredPartTypes: PartTypeModel[] = []
  filteredManufacturers: ManufacturerModel[] = []
  filteredMeasurementUnits: string[] = []
  filteredFootprints: string[] = []

  partTypeFilterControl = new FormControl<string>('');
  manufacturerFilterControl = new FormControl<string>('');
  measurementUnitFilterControl = new FormControl<string>('');
  footprintFilterControl = new FormControl<string>('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModelData,
              public dialogRef: MatDialogRef<PartDialogComponent>,
              public partTypeService: PartTypeService,
              public manufacturerService: ManufacturerService,
              public trayService: TrayService,
              public measurementUnitService: measurementUnitService,
              public shelfService: ShelfService,
              public footprintService: FootprintService,
              public partService: PartService,
              public dialog: MatDialog) {

    partTypeService.get().subscribe(it => this.filteredPartTypes = this.partTypes = it)
    manufacturerService.get().subscribe(it => this.filteredManufacturers = this.manufacturers = it)
    trayService.get().subscribe(it => this.trays = it)
    measurementUnitService.get().subscribe(it => this.filteredMeasurementUnits = this.measurementUnits = it)
    footprintService.get().subscribe(it => this.filteredFootprints = this.footprints = it)
    shelfService.get().subscribe(it => this.shelfs = it)
    partService.get().subscribe(it => this.parts = it)

    this.partTypeFilterControl.valueChanges.subscribe(it => this.filterPartTypes(it));
    this.manufacturerFilterControl.valueChanges.subscribe(it => this.filterManufacturers(it));
    this.measurementUnitFilterControl.valueChanges.subscribe(it => this.filterMeasurementUnits(it));
    this.footprintFilterControl.valueChanges.subscribe(it => this.filterFootprints(it));

    if (data.mode == "edit") {
      this.nameControl.setValue(data.model.name || null)
      this.quantityControl.setValue(data.model.quantity || null)
      this.measurementUnitControl.setValue(data.model.measurementUnit || null)
      this.valueControl.setValue(data.model.value || null)
      this.footprintControl.setValue(data.model.footprint || null)
      this.partTypeControl.setValue(data.model.partType?.id || null)
      this.manufacturerControl.setValue(data.model.manufacturer?.id || null)
      this.trayControl.setValue(data.model.tray?.id || null)
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let part: PartModel = {
      id: undefined,
      name: this.nameControl.value || undefined,
      quantity: this.quantityControl.value || undefined,
      measurementUnit: this.measurementUnitControl.value || null,
      value: this.valueControl.value || null,
      footprint: this.footprintControl.value || null,
      partType: this.partTypes.find(it => it.id == this.partTypeControl.value) || undefined,
      manufacturer: this.manufacturers.find(it => it.id == this.manufacturerControl.value) || undefined,
      tray: this.trays.find(it => it.id == this.trayControl.value) || undefined,
    };

    if (this.data.mode == "edit") {
      part.id = this.data.model.id
    }

    this.dialogRef.close(part);
  }

  formatStorageLocation(tray: TrayModel) {
    let trayName = tray?.name || ""
    let shelfName = ""
    shelfName = this.shelfs.find(shelf => shelf.trays && shelf.trays.some(it => it.id === tray?.id))?.name || ""
    return shelfName + "-" + trayName
  }

  getTrays() {
    if (this.data.mode == "edit") {
      return this.trays
    }

    return this.trays.filter(tray => {
      return this.parts.find(part => {
        return part.tray?.id == tray.id
      }) == undefined
    })
  }

  allowSave(): boolean {
    return this.nameControl.invalid ||
      this.quantityControl.invalid ||
      this.measurementUnitControl.invalid ||
      this.valueControl.invalid ||
      this.footprintControl.invalid ||
      this.partTypeControl.invalid ||
      this.manufacturerControl.invalid ||
      this.trayControl.invalid
  }

  private filterPartTypes(search: string | null) {
    if (!this.partTypes) {
      return;
    }
    if (!search) {
      this.filteredPartTypes = this.partTypes
      return;
    }
    console.log(this.partTypes.filter(it => it.name!!.toLowerCase().indexOf(search.toLowerCase()) > -1));

    this.filteredPartTypes = this.partTypes.filter(it => it.name!!.toLowerCase().indexOf(search.toLowerCase()) > -1)
  }

  private filterManufacturers(search: string | null) {
    if (!this.manufacturers) {
      return;
    }
    if (!search) {
      this.filteredManufacturers = this.manufacturers
      return;
    }
    this.filteredManufacturers = this.manufacturers.filter(it => it.name!!.toLowerCase().indexOf(search.toLowerCase()) > -1)
  }

  private filterMeasurementUnits(search: string | null) {
    if (!this.measurementUnits) {
      return;
    }
    if (!search) {
      this.filteredMeasurementUnits = this.measurementUnits
      return;
    }
    this.filteredMeasurementUnits = this.measurementUnits.filter(it => it.toLowerCase().indexOf(search.toLowerCase()) > -1)
  }

  private filterFootprints(search: string | null) {
    if (!this.footprints) {
      return;
    }
    if (!search) {
      this.filteredFootprints = this.footprints
      return;
    }
    this.filteredFootprints = this.footprints.filter(it => it.toLowerCase().indexOf(search.toLowerCase()) > -1)
  }
}
