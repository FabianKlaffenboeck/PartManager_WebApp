import {Record} from '../rest-api.service';

export class TrayModel implements Record {
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
