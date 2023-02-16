import {Record} from '../service/rest-api.service';

export class TrayModel implements Record {
  id: number | undefined
  label: string | undefined


  constructor(options: {
    id?: number | undefined
    label?: string | undefined

  } = {}) {
    this.id = options.id
    this.label = options.label
  }
}
