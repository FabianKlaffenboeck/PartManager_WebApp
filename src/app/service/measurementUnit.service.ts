import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {basicAPIErrorHandler} from "./data-provider.service";
import {RestApiService} from "./rest-api.service";
import {PartTypeModel} from "../models/PartType.model";


@Injectable({
  providedIn: 'root'
})
export class measurementUnitService {

  private restApi

  constructor(
    private api: RestApiService,
  ) {
    this.restApi = this.api.for<string>("measurementUnit")
  }

  /**
   * returns all partType depending on the value of fields. If fields is
   * null, the REST api is getting called, else the GraphQL api service
   * is used.
   * @param parameters
   * @param fields
   */
  public get(parameters?: { [key: string]: any; }): Observable<string[]> {
    return new Observable<string[]>(
      subscriber => {

        this.restApi.get(records => {
          try {
            subscriber.next(records)
            // this.parseResponse(records, subscriber);
          } catch (e) {
            basicAPIErrorHandler(subscriber, e)
          }
        }, error => {
          basicAPIErrorHandler(subscriber, error)
        }, parameters)

      }
    )
  }

  private parseResponse(records: PartTypeModel[], subscriber: Subscriber<PartTypeModel[]>) {
    let parsedCustomers: PartTypeModel[] = []
    records.forEach((partType: PartTypeModel) => {
      parsedCustomers.push(new PartTypeModel(partType))
    })
    subscriber.next(parsedCustomers)
    subscriber.complete()
  }
}
