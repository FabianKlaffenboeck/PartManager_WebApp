import {Record} from '../rest-api.service';
import {TrayModel} from "./Tray.model";
import {ManufacturerModel} from "./Manufacturer.model";

export class FootprintModel implements Record {
  id: number | undefined
  name: string | undefined

  constructor(options: {
    id?: number | undefined
    name?: string | undefined

  } = {}) {
    this.id = options.id
    this.name = options.name
  }
}
