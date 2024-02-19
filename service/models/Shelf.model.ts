import {Record} from '../rest-api.service';
import {TrayModel} from "./Tray.model";

export class ShelfModel implements Record {
  id: number | undefined
  name: string | undefined
  trays: TrayModel[] | undefined

  constructor(options: {
    id?: number | undefined
    name?: string | undefined
    trays?: TrayModel[] | undefined

  } = {}) {
    this.id = options.id
    this.name = options.name
    this.trays = options.trays
  }
}
