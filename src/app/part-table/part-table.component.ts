import {Component, OnInit} from '@angular/core';
import {PartModel} from "../../../service/models/Part.model";
import {ShelfModel} from "../../../service/models/Shelf.model";
import {PartService} from "../../../service/data/Part.service";
import {ShelfService} from "../../../service/data/Shelf.service";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {PartDialogComponent} from "../dialogs/part-dialog/part-dialog.component";
import {ShelfDialogComponent} from "../dialogs/shelf-dialog/shelf-dialog.component";
import {FootprintDialogComponent} from "../dialogs/footprint-dialog/footprint-dialog.component";
import {MeasurementUnitDialogComponent} from "../dialogs/measurementUnit-dialog/measurementUnit-dialog.component";
import {ManufacturerDialogComponent} from "../dialogs/manufacturer-dialog/manufacturer-dialog.component";
import {PartTypeDialogComponent} from "../dialogs/partType-dialog/partType-dialog.component";
import {PartTypeService} from "../../../service/data/PartType.service";
import {ManufacturerService} from "../../../service/data/Manufacturer.service";
import {FootprintService} from "../../../service/data/Footprint.service";
import {MeasurementUnitModel} from "../../../service/models/MeasurementUnit.model";
import {MeasurementUnitService} from "../../../service/data/MeasurementUnit.service";

@Component({
  selector: 'part-table',
  templateUrl: './part-table.component.html',
  styleUrls: ['./part-table.component.scss']
})
export class PartTableComponent implements OnInit {

  parts: PartModel[] = []
  shelfs: ShelfModel[] = []

  constructor(public partService: PartService,
              public partTypeService: PartTypeService,
              public shelfService: ShelfService,
              public manufacturerService: ManufacturerService,
              public footprintService: FootprintService,
              public measurementUnitService: MeasurementUnitService,
              private messageService: MessageService,
              public dialogService: DialogService,) {
  }

  ngOnInit() {
    this.partService.get().subscribe(it => this.parts = it)
    this.shelfService.get().subscribe(it => this.shelfs = it)
  }

  getStorageLocation(part: PartModel) {
    return `${this.shelfs.find(shelf => shelf.trays && shelf.trays.some(tray => tray.id === part.tray?.id))?.name || ""}-${part.tray?.name || ""}`
  }

  add() {
    this.dialogService.open(PartDialogComponent, {
      header: 'Add Part',
      height: '60%',
      baseZIndex: 10000,
      data: {model: null},
    }).onClose.subscribe(result => {
      this.executeSaveOrUpdate(result)
    })
  }

  edit(part: PartModel) {
    this.dialogService.open(PartDialogComponent, {
      header: 'Edit Part',
      height: '60%',
      baseZIndex: 10000,
      data: {model: part},
    }).onClose.subscribe(result => {
      this.executeSaveOrUpdate(result)
    })
  }

  executeSaveOrUpdate(part: PartModel) {
    if (!part) {
      this.messageService.addAll([{
        severity: 'error',
        summary: 'Something went wrong',
      }]);
      return
    }
    this.partService.save(part).subscribe(result => {

      if (this.parts.find(it => it.id == result.id)) {
        this.parts[this.parts.findIndex(it => it.id == part.id)] = part
      } else {
        this.parts.push(part)
      }

      this.messageService.addAll([{
        severity: 'success',
        summary: 'Successfully',
        detail: part.name + " was saved successfully"
      }]);
    }, _ => {
      this.messageService.addAll([{
        severity: 'error',
        summary: 'Something went wrong',
      }]);
    })
  }

  delete(part: PartModel) {
    this.partService.delete(part.id!).subscribe(it => {
      this.messageService.addAll([{
        severity: 'success',
        summary: 'Delete successfully',
        detail: part.name + " was deleted successfully"
      }]);
      this.parts = this.parts.filter(it => it.id != part.id)
    }, _ => {
      this.messageService.addAll([{
        severity: 'error',
        summary: 'Delete not possible',
        detail: "An error occurred while deleting " + part.name
      }]);
    })
  }

  addShelf() {
    this.dialogService.open(ShelfDialogComponent, {
      header: 'Add Shelf',
      height: '60%',
      baseZIndex: 10000,
      data: {model: null},
    }).onClose.subscribe(result => {
      if (!result) {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
        return
      }
      this.shelfService.save(result).subscribe(result => {
        this.messageService.addAll([{
          severity: 'success',
          summary: 'Successfully',
          detail: result.name + " was saved successfully"
        }]);
      }, _ => {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
      })
    })
  }

  addFootprint() {
    this.dialogService.open(FootprintDialogComponent, {
      header: 'Add Footprint',
      height: '60%',
      baseZIndex: 10000,
      data: {model: null},
    }).onClose.subscribe(result => {
      if (!result) {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
        return
      }
      this.footprintService.save(result).subscribe(result => {
        this.messageService.addAll([{
          severity: 'success',
          summary: 'Successfully',
          detail: result.name + " was saved successfully"
        }]);
      }, _ => {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
      })
    })
  }

  addMeasurementUnit() {
    this.dialogService.open(MeasurementUnitDialogComponent, {
      header: 'Add MeasurementUnit',
      height: '60%',
      baseZIndex: 10000,
      data: {model: null},
    }).onClose.subscribe(result => {
      if (!result) {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
        return
      }
      this.measurementUnitService.save(result).subscribe(result => {
        this.messageService.addAll([{
          severity: 'success',
          summary: 'Successfully',
          detail: result.name + " was saved successfully"
        }]);
      }, _ => {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
      })
    })
  }

  addManufacturer() {
    this.dialogService.open(ManufacturerDialogComponent, {
      header: 'Add Manufacturer',
      height: '60%',
      baseZIndex: 10000,
      data: {model: null},
    }).onClose.subscribe(result => {
      if (!result) {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
        return
      }
      this.manufacturerService.save(result).subscribe(result => {
        this.messageService.addAll([{
          severity: 'success',
          summary: 'Successfully',
          detail: result.name + " was saved successfully"
        }]);
      }, _ => {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
      })
    })
  }

  addPartType() {
    this.dialogService.open(PartTypeDialogComponent, {
      header: 'Add PartType',
      height: '60%',
      baseZIndex: 10000,
      data: {model: null},
    }).onClose.subscribe(result => {
      if (!result) {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
        return
      }
      this.partTypeService.save(result).subscribe(result => {
        this.messageService.addAll([{
          severity: 'success',
          summary: 'Successfully',
          detail: result.name + " was saved successfully"
        }]);
      }, _ => {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
      })
    })
  }
}
