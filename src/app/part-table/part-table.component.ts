import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PartModel} from "../models/Part.model";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {PartService} from "../service/data/Part.service";
import {NotificationService} from "../service/notification.service";
import {PartDialogComponent} from "../dialogues/part-dialog/part-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ShelfService} from "../service/data/Shelf.service";
import {ShelfModel} from "../models/Shelf.model";
import {ManufacturerModel} from "../models/Manufacturer.model";
import {PartTypeModel} from "../models/PartType.model";

@Component({
  selector: 'part-table', templateUrl: './part-table.component.html', styleUrls: ['./part-table.component.scss']
})

export class PartTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort = new MatSort()
  displayedColumns = ['name', 'quantity', 'partType', 'manufacturer', 'tray', 'value', 'footprint', 'actions'];
  dataSource = new MatTableDataSource<PartModel>();
  parts: PartModel[] = []
  selectedParts: PartModel[] = []
  shelfs: ShelfModel[] = []

  constructor(public partService: PartService,
              public shelfService: ShelfService,
              public notificationService: NotificationService,
              public dialog: MatDialog
  ) {
  }

  private _selectedManufacturers: ManufacturerModel[] = []

  @Input() set selectedManufacturers(value: ManufacturerModel[]) {
    this._selectedManufacturers = value;
    this.filterSelectedManufacturers(value)
  }

  private _selectedPartTypes: PartTypeModel[] = []

  @Input() set selectedPartTypes(value: PartTypeModel[]) {
    this._selectedPartTypes = value;
    this.filterSelectedPartTypes(value)
  }

  ngOnInit() {
    this.partService.get().subscribe(it => {
      this.parts = it
      this.selectedParts = this.parts
      this.dataSource = new MatTableDataSource(this.selectedParts)
      this.dataSource.sort = this.sort;
    })

    this.shelfService.get().subscribe(it => {
      this.shelfs = it
    })
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

          this.notificationService.success("add", saved.name)
        }, error => {
          this.notificationService.error()
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

          this.notificationService.success("edit", saved.name)
        }, error => {
          this.notificationService.error()
        })
      }
    });
  }

  delete(element: PartModel) {
    if (element.id) {
      this.partService.delete(element.id).subscribe(() => {
        this.notificationService.success("delete", element.name)
        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(it => it.id != element.id));
      }, error => {
        this.notificationService.error()
      })
    }
  }

  unitFormatter(element: PartModel) {
    if (!element.value) {
      return "-"
    }
    return element.value + " " + element.measurementUnit
  }

  formatter(text: string) {
    if (!text) {
      return "-"
    }
    return text
  }

  formatStorageLocation(element: PartModel) {
    let trayName = element.tray?.name || ""
    let shelfName = ""

    shelfName = this.shelfs.find(shelf => shelf.trays && shelf.trays.some(tray => tray.id === element.tray?.id))?.name || ""

    return shelfName + "-" + trayName
  }

  filterSelectedManufacturers(value: ManufacturerModel[]) {
    if (value.length > 0) {
      value.forEach(manufacturer => {
        this.selectedParts = this.parts.filter(it => it.manufacturer?.name == manufacturer.name)
        this.dataSource = new MatTableDataSource(this.selectedParts)
        this.dataSource.sort = this.sort;
      })
    } else {
      this.selectedParts = this.parts
      this.dataSource = new MatTableDataSource(this.selectedParts)
      this.dataSource.sort = this.sort;
    }
  }

  filterSelectedPartTypes(value: PartTypeModel[]) {
    if (value.length > 0) {
      value.forEach(manufacturer => {
        this.selectedParts = this.parts.filter(it => it.partType?.name == manufacturer.name)
        this.dataSource = new MatTableDataSource(this.selectedParts)
        this.dataSource.sort = this.sort;
      })
    } else {
      this.selectedParts = this.parts
      this.dataSource = new MatTableDataSource(this.selectedParts)
      this.dataSource.sort = this.sort;
    }
  }
}
