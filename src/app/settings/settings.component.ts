import {Component} from '@angular/core';
import {ManufacturerService} from "../service/data/Manufacturer.service";
import {PartTypeService} from "../service/data/PartType.service";
import {ShelfService} from "../service/data/Shelf.service";
import {PartService} from "../service/data/Part.service";
import {TrayService} from "../service/data/Tray.service";
import {saveAs} from "file-saver";
import {ManufacturerModel} from "../service/models/Manufacturer.model";
import {PartModel} from "../service/models/Part.model";
import {PartTypeModel} from "../service/models/PartType.model";
import {ShelfModel} from "../service/models/Shelf.model";
import {TrayModel} from "../service/models/Tray.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private selectedFiles: any[] | undefined;
  private selFiles: FileList | null | undefined;

  constructor(
    public manufacturerService: ManufacturerService,
    public partService: PartService,
    public partTypeService: PartTypeService,
    public shelfService: ShelfService,
    public trayService: TrayService
  ) {
  }

  export() {
    this.manufacturerService.get().subscribe(it => {
      saveAs(new Blob([JSON.stringify(it)]), "Manufacturers.json");
    })
    this.partService.get().subscribe(it => {
      saveAs(new Blob([JSON.stringify(it)]), "Parts.json");
    })
    this.partTypeService.get().subscribe(it => {
      saveAs(new Blob([JSON.stringify(it)]), "PartTypes.json");
    })
    this.shelfService.get().subscribe(it => {
      saveAs(new Blob([JSON.stringify(it)]), "Shelfs.json");
    })
    this.trayService.get().subscribe(it => {
      saveAs(new Blob([JSON.stringify(it)]), "Trays.json");
    })
  }

  import(event: any) {

    let files = event.target.files;
    let manufacturers = [...files].find(it => it.name == "Manufacturers.json")
    let parts = [...files].find(it => it.name == "Parts.json")
    let partTypes = [...files].find(it => it.name == "PartTypes.json")
    let shelfs = [...files].find(it => it.name == "Shelfs.json")
    let trays = [...files].find(it => it.name == "Trays.json")

    if (!(manufacturers && parts && partTypes && shelfs && trays)) {
      console.error("What have you done ????")
      return
    }

    let tmpManufacturersReader = new FileReader()
    let tmpPartTypesReader = new FileReader()
    let tmpTraysReader = new FileReader()
    let tmpShelfsReader = new FileReader()
    let tmpPartsReader = new FileReader()

    tmpManufacturersReader.onload = () => {
      this.saveManufacturers(JSON.parse(tmpManufacturersReader.result as string))
      tmpPartTypesReader.onload = () => {
        this.savePartTypes(JSON.parse(tmpPartTypesReader.result as string))
        tmpTraysReader.onload = () => {
          this.saveTrays(JSON.parse(tmpTraysReader.result as string))
          tmpShelfsReader.onload = () => {
            this.saveShelfs(JSON.parse(tmpShelfsReader.result as string))
            tmpPartsReader.onload = () => {
              this.saveParts(JSON.parse(tmpPartsReader.result as string))
            }
          }
        }
      }
    }

    tmpManufacturersReader.readAsText(manufacturers)
    tmpPartTypesReader.readAsText(partTypes)
    tmpTraysReader.readAsText(trays)
    tmpShelfsReader.readAsText(shelfs)
    tmpPartsReader.readAsText(parts)
  }

  saveManufacturers(array: ManufacturerModel[]) {
    let tmp = array.pop()
    if (tmp == undefined) {
      return
    }
    let tmp2 = new ManufacturerModel(tmp)
    tmp2.id = undefined
    this.manufacturerService.save(tmp2).subscribe(it => this.saveManufacturers(array))
  }

  saveParts(array: PartModel[]) {
    let tmp = array.pop()
    if (tmp == undefined) {
      return
    }
    let tmp2 = new PartModel(tmp)
    tmp2.id = undefined
    this.partService.save(tmp2).subscribe(it => this.saveParts(array))
  }

  savePartTypes(array: PartTypeModel[]) {
    let tmp = array.pop()
    if (tmp == undefined) {
      return
    }
    let tmp2 = new PartTypeModel(tmp)
    tmp2.id = undefined
    this.partTypeService.save(tmp2).subscribe(it => this.savePartTypes(array))
  }

  saveShelfs(array: ShelfModel[]) {
    let tmp = array.pop()
    if (tmp == undefined) {
      return
    }
    let tmp2 = new ShelfModel(tmp)
    tmp2.id = undefined
    this.shelfService.save(tmp2).subscribe(it => this.saveShelfs(array))
  }

  saveTrays(array: TrayModel[]) {
    let tmp = array.pop()
    if (tmp == undefined) {
      return
    }
    let tmp2 = new TrayModel(tmp)
    tmp2.id = undefined
    this.trayService.save(tmp2).subscribe(it => this.saveTrays(array))
  }
}
