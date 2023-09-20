import {Component, Input, OnInit} from '@angular/core';
import {PartModel} from "../../service/models/Part.model";
import {MatTableDataSource} from "@angular/material/table";
import {PartService} from "../../service/data/Part.service";
import {AlertServility, NotificationService} from "../../service/notification.service";
import {PartDialogComponent} from "../../dialogues/part-dialog/part-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ShelfService} from "../../service/data/Shelf.service";
import {ShelfModel} from "../../service/models/Shelf.model";
import {ManufacturerModel} from "../../service/models/Manufacturer.model";
import {PartTypeModel} from "../../service/models/PartType.model";

@Component({
  selector: 'part-table', templateUrl: './part-table.component.html', styleUrls: ['./part-table.component.scss']
})

export class PartTableComponent implements OnInit {

  displayedColumns = ['name', 'quantity', 'partType', 'manufacturer', 'tray', 'value', 'footprint', 'actions'];
  dataSource = new MatTableDataSource<PartModel>();

  parts: PartModel[] = []
  shelfs: ShelfModel[] = []

  private _selectedManufacturers: ManufacturerModel[] = []
  private _selectedPartTypes: PartTypeModel[] = []

  constructor(public partService: PartService,
              public shelfService: ShelfService,
              public notificationService: NotificationService,
              public dialog: MatDialog
  ) {
  }

  @Input() set selectedManufacturers(value: ManufacturerModel[]) {
    this._selectedManufacturers = value;
    this.filter()
  }


  @Input() set selectedPartTypes(value: PartTypeModel[]) {
    this._selectedPartTypes = value;
    this.filter()
  }

  ngOnInit() {
    this.partService.get().subscribe(it => {
      this.parts = it
      this.dataSource = new MatTableDataSource(this.parts)
    })
    this.shelfService.get().subscribe(it => this.shelfs = it)
  }

  add() {
    this.dialog.open(PartDialogComponent, {
      data: {
        mode: "add"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.partService.save(result).subscribe(saved => {

          this.parts.push(saved)
          this.dataSource = new MatTableDataSource(this.parts)

          this.notificationService.snackbar(AlertServility.SUCCESS, "saving was successful")
        }, error => {
          this.notificationService.snackbar(AlertServility.ERROR, "error while saving")
        })
      }
    });
  }

  edit(element: PartModel) {
    this.dialog.open(PartDialogComponent, {
      data: {
        model: element, mode: "edit"
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.partService.save(result).subscribe(saved => {

          let index = this.dataSource.data.findIndex(it => it.id == saved.id)
          this.dataSource.data[index] = saved
          this.dataSource = new MatTableDataSource(this.dataSource.data)

          this.notificationService.snackbar(AlertServility.SUCCESS, "edit was successful")
        }, error => {
          this.notificationService.snackbar(AlertServility.ERROR, "error while saving")
        })
      }
    });
  }

  delete(element: PartModel) {
    if (element.id) {
      this.partService.delete(element.id).subscribe(() => {
        this.notificationService.snackbar(AlertServility.SUCCESS, "deleting was successful")
        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(it => it.id != element.id));
      }, error => {
        this.notificationService.snackbar(AlertServility.ERROR, "error while deleting")
      })
    }
  }

  unitFormatter(element: PartModel) {
    if (!element.value) {
      return "-"
    }
    return `${element.value} ${element.measurementUnit}`
  }

  formatter(text: string) {
    return text || "-"
  }

  formatStorageLocation(element: PartModel) {
    return `${this.shelfs.find(shelf => shelf.trays && shelf.trays.some(tray => tray.id === element.tray?.id))?.name || ""}-${element.tray?.name || ""}`
  }

  private filter() {
    let tmp: PartModel[] = this.parts

    if ((this._selectedPartTypes.length > 0) || (this._selectedManufacturers.length > 0)) {
      tmp = []

      this._selectedManufacturers.forEach(manufacturer => {
        tmp = tmp.concat(this.parts.filter(it => it.manufacturer?.id == manufacturer.id))
      })

      this._selectedPartTypes.forEach(partType => {
        tmp = tmp.concat(this.parts.filter(it => it.partType?.id == partType.id))
      })
    }


    this.dataSource.data = tmp
  }
}
