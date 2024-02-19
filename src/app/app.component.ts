import {Component, OnInit} from '@angular/core';
import {MenuItem, MenuItemCommandEvent, MessageService} from "primeng/api";
import {ShelfDialogComponent} from "./dialogs/shelf-dialog/shelf-dialog.component";
import {FootprintDialogComponent} from "./dialogs/footprint-dialog/footprint-dialog.component";
import {MeasurementUnitDialogComponent} from "./dialogs/measurementUnit-dialog/measurementUnit-dialog.component";
import {ManufacturerDialogComponent} from "./dialogs/manufacturer-dialog/manufacturer-dialog.component";
import {PartTypeDialogComponent} from "./dialogs/partType-dialog/partType-dialog.component";
import {ManufacturerService} from "../../service/data/Manufacturer.service";
import {FootprintService} from "../../service/data/Footprint.service";
import {MeasurementUnitService} from "../../service/data/MeasurementUnit.service";
import {PartTypeService} from "../../service/data/PartType.service";
import {DialogService} from "primeng/dynamicdialog";
import {ShelfService} from "../../service/data/Shelf.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  title = 'PartManager';

  constructor(
    public manufacturerService: ManufacturerService,
    public footprintService: FootprintService,
    public measurementUnitService: MeasurementUnitService,
    public partTypeService: PartTypeService,
    private messageService: MessageService,
    public dialogService: DialogService,
    public shelfService: ShelfService,
  ) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Add Items',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Add Shelf',
            icon: 'pi pi-plus',
            command: () => {
              this.addShelf()
            },
          },
          {
            label: 'Add Footprint',
            icon: 'pi pi-plus',
            command: () => {
              this.addFootprint()
            }
          },
          {
            label: 'Add MeasurementUnit',
            icon: 'pi pi-plus',
            command: () => {
              this.addMeasurementUnit()
            }
          },
          {
            label: 'Add Manufacturer',
            icon: 'pi pi-plus',
            command: () => {
              this.addManufacturer()
            }
          },
          {
            label: 'Add PartType',
            icon: 'pi pi-plus',
            command: () => {
              this.addPartType()
            }
          },
        ]
      }
    ];
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
