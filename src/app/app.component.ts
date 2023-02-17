import {Component, OnInit} from '@angular/core';
import {ManufacturerService} from "./service/manufacturer.service";
import {PartTypeService} from "./service/partType.service";
import {ShelfService} from "./service/shelf.service";
import {TrayService} from "./service/tray.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PartManagerWebApp';

  constructor(
    public manufacturerService: ManufacturerService,
    public partTypeService: PartTypeService,
    public shelfService: ShelfService,
    public trayService: TrayService,
  ) {
  }

  ngOnInit() {
    this.manufacturerService.get().subscribe(it => console.table(it))
    this.partTypeService.get().subscribe(it => console.table(it))
    this.shelfService.get().subscribe(it => console.table(it))
    this.trayService.get().subscribe(it => console.table(it))
  }
}

