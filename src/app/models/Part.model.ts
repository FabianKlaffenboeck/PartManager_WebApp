import {Record} from '../service/rest-api.service';
import {TrayModel} from "./Tray.model";
import {ManufacturerModel} from "./Manufacturer.model";
import {PartTypeModel} from "./PartType.model";

export class PartModel implements Record {
  id: number | undefined
  name: string | undefined
  quantity: number | undefined
  measurementUnit: string | null
  value: number | null
  footprint: string | null
  partType: PartTypeModel | undefined
  manufacturer: ManufacturerModel | undefined
  tray: TrayModel | undefined

  constructor(options: {
    id?: number | undefined
    name?: string | undefined
    quantity?: number | undefined
    measurementUnit?: string | null
    value?: number | null
    footprint?: string | null
    partType?: PartTypeModel | undefined
    manufacturer?: ManufacturerModel | undefined
    tray?: TrayModel | undefined

  } = {}) {
    this.id = options.id
    this.name = options.name
    this.quantity = options.quantity
    this.measurementUnit = options.measurementUnit || null
    this.value = options.value || null
    this.footprint = options.footprint || null
    this.partType = options.partType
    this.manufacturer = options.manufacturer
    this.tray = options.tray
  }
}
