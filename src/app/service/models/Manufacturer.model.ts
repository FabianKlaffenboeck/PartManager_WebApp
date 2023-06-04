import {Record} from '../rest-api.service';

export class ManufacturerModel implements Record {
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
