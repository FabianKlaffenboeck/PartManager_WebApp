import {Component} from '@angular/core';
import {ManufacturerService} from "../service/data/Manufacturer.service";
import {PartTypeService} from "../service/data/PartType.service";
import {ShelfService} from "../service/data/Shelf.service";
import {PartService} from "../service/data/Part.service";
import {TrayService} from "../service/data/Tray.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(
    public manufacturerService: ManufacturerService,
    public partService: PartService,
    public partTypeService: PartTypeService,
    public shelfService: ShelfService,
    public trayService: TrayService
  ) {
  }

  export() {
    this.manufacturerService.get().subscribe(it =>{
      console.log(it)
    })
    this.partService.get().subscribe(it =>{
      console.log(it)
    })
    this.partTypeService.get().subscribe(it =>{
      console.log(it)
    })
    this.shelfService.get().subscribe(it =>{
      console.log(it)
    })
    this.trayService.get().subscribe(it =>{
      console.log(it)
    })
  }

  import() {

  }
}
