import {Component, OnInit} from '@angular/core';
import {PartModel} from "../../../service/models/Part.model";
import {ShelfModel} from "../../../service/models/Shelf.model";
import {PartService} from "../../../service/data/Part.service";
import {ShelfService} from "../../../service/data/Shelf.service";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {PartDialogComponent} from "../dialogs/part-dialog/part-dialog.component";

@Component({
  selector: 'part-table',
  templateUrl: './part-table.component.html',
  styleUrls: ['./part-table.component.scss']
})
export class PartTableComponent implements OnInit {

  parts: PartModel[] = []
  shelfs: ShelfModel[] = []

  constructor(public partService: PartService,
              public shelfService: ShelfService,
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
      width: '70%',
      height: '70%',
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
      this.partService.save(result).subscribe(it => {
        this.messageService.addAll([{
          severity: 'success',
          summary: 'Saved successfully',
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

  edit(part: PartModel) {
    this.dialogService.open(PartDialogComponent, {
      header: 'Add Part',
      width: '70%',
      height: '70%',
      baseZIndex: 10000,
      data: {model: part},
    }).onClose.subscribe(result => {
      if (!result) {
        this.messageService.addAll([{
          severity: 'error',
          summary: 'Something went wrong',
        }]);
        return
      }
      this.partService.save(result).subscribe(it => {
        this.messageService.addAll([{
          severity: 'success',
          summary: 'Edit was successfully',
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
}
