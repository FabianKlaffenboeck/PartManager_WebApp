import {Component, OnInit} from '@angular/core';
import {PartModel} from "../../../service/models/Part.model";
import {ShelfModel} from "../../../service/models/Shelf.model";
import {PartService} from "../../../service/data/Part.service";
import {ShelfService} from "../../../service/data/Shelf.service";
import {NotificationService} from "../../../service/notification.service";

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
              public notificationService: NotificationService) {
  }

  ngOnInit() {
    this.partService.get().subscribe(it => console.log(it))
  }


}
