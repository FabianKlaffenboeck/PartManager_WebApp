import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {
  basicAPIErrorHandler,
  DataProviderService,
  DataTransformationService,
  FormOptionsProvider,
  FormSelectOption
} from "./data-provider.service";
import {RestApiService} from "./rest-api.service";
import {GraphQlApiService} from "./graphql-api.service";
import {ManufacturerModel} from "../models/Manufacturer.model";


@Injectable({
  providedIn: 'root'
})
export class ManufacturerService implements DataProviderService<ManufacturerModel>, DataTransformationService<ManufacturerModel>, FormOptionsProvider {

  private restApi

  constructor(
    private api: RestApiService,
    private graphQl: GraphQlApiService,
  ) {
    this.restApi = this.api.for<ManufacturerModel>("manufacturer")
  }

  /**
   * Returns a list of formSelectOptions, which is the bound to the
   * SelectOption
   */
  public getFormSelectOptions(filterParameters: { [key: string]: any; } = {}): Observable<FormSelectOption[]> {
    return new Observable<FormSelectOption[]>(subscriber => {
      this.get(filterParameters, ["id", "sensorType"]).subscribe(records => {
        subscriber.next(this.parseSelectOptions(records))
        subscriber.complete()
      })
    })
  }

  /**
   * Returns the sensor with the given id, depending on the value of
   * fields. If fields is null, the REST api is getting called, else
   * the GraphQL api service is used
   *
   * @param id
   * @param fields
   */
  public getById(id: number, fields?: String[]): Observable<ManufacturerModel[]> {
    return new Observable<ManufacturerModel[]>(subscriber => {
      if (fields) {
        this.getByIdGraphQL(fields, id, subscriber)
      } else {
        this.getByIdRest(subscriber, id)
      }
    })
  }

  /**
   * returns all sensor depending on the value of fields. If fields is
   * null, the REST api is getting called, else the GraphQL api service
   * is used.
   * @param parameters
   * @param fields
   */
  public get(parameters?: { [key: string]: any; }, fields?: String[]): Observable<ManufacturerModel[]> {
    return new Observable<ManufacturerModel[]>(
      subscriber => {
        if (fields) {
          this.getGraphQL(fields, parameters, subscriber);
        } else {
          this.getREST(subscriber, parameters);
        }
      }
    )
  }

  /**
   * Deletes the sensor with the given id
   * @param recordId
   */
  public delete(recordId: number): Observable<any> {
    return new Observable<any>(subscriber => {
      this.restApi.delete(recordId, () => {
        subscriber.next()
        subscriber.complete()
      }, error => {
        basicAPIErrorHandler(subscriber, error)
      })
    })
  }

  /**
   * Saves the given sensor into the database
   * @param record
   */
  public save(record: ManufacturerModel): Observable<ManufacturerModel> {
    return new Observable<ManufacturerModel>(subscriber => {
      this.restApi.save(record, savedRecord => {
        try {
          subscriber.next(new ManufacturerModel(savedRecord))
          subscriber.complete()
        } catch (e) {
          basicAPIErrorHandler(subscriber, e)
        }
      }, error => {
        basicAPIErrorHandler(subscriber, error)
      })
    })
  }

  private getByIdGraphQL(fields: String[], id: number, subscriber: Subscriber<ManufacturerModel[]>) {
    let query = `query sensorById($id: Int!){sensorById(id: $id) {${fields.join(',')}}}`
    this.graphQl.request(query, {id: id}).subscribe(value => {
      this.parseResponse(value.data.sensorById, subscriber)
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getByIdRest(subscriber: Subscriber<ManufacturerModel[]>, id: number) {
    this.restApi.getById(id, record => {
      try {
        this.parseResponse([record], subscriber);
      } catch (e) {
        basicAPIErrorHandler(subscriber, e)
      }
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getGraphQL(fields: String[], parameters: { [p: string]: any } | undefined, subscriber: Subscriber<ManufacturerModel[]>) {
    let query = `query sensors{sensors{${fields.join(',')}}}`
    this.graphQl.request(query, parameters).subscribe(value => {
      this.parseResponse(value.data.sensors, subscriber);
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getREST(subscriber: Subscriber<ManufacturerModel[]>, parameters?: { [p: string]: any }) {
    this.restApi.get(records => {
      try {
        this.parseResponse(records, subscriber);
      } catch (e) {
        basicAPIErrorHandler(subscriber, e)
      }
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    }, parameters)
  }

  private parseResponse(records: ManufacturerModel[], subscriber: Subscriber<ManufacturerModel[]>) {
    let parsedCustomers: ManufacturerModel[] = []
    records.forEach((manufacturer: ManufacturerModel) => {
      parsedCustomers.push(new ManufacturerModel(manufacturer))
    })
    subscriber.next(parsedCustomers)
    subscriber.complete()
  }

  private parseSelectOptions(records: ManufacturerModel[]): FormSelectOption[] {
    let options: FormSelectOption[] = []
    records.forEach(value => {
      options.push({
        value: value.id,
        label: value.name || ""
      })
    })
    return options
  }
}
