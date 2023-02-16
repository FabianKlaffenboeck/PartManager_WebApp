import {Record} from '../service/rest-api.service';

export class PartTypeModel implements Record {
  id: number | undefined
  type: string | undefined


  constructor(options: {
    id?: number | undefined
    type?: string | undefined

  } = {}) {
    this.id = options.id
    this.type = options.type
  }
}
