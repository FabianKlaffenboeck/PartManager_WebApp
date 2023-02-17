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
import {TrayModel} from "../models/Tray.model";


@Injectable({
  providedIn: 'root'
})
export class TrayService implements DataProviderService<TrayModel>, DataTransformationService<TrayModel>, FormOptionsProvider {

  private restApi

  constructor(
    private api: RestApiService,
    private graphQl: GraphQlApiService,
  ) {
    this.restApi = this.api.for<TrayModel>("tray")
  }

  /**
   * Returns a list of formSelectOptions, which is the bound to the
   * SelectOption
   */
  public getFormSelectOptions(filterParameters: { [key: string]: any; } = {}): Observable<FormSelectOption[]> {
    return new Observable<FormSelectOption[]>(subscriber => {
      this.get(filterParameters, ["id", "trayType"]).subscribe(records => {
        subscriber.next(this.parseSelectOptions(records))
        subscriber.complete()
      })
    })
  }

  /**
   * Returns the tray with the given id, depending on the value of
   * fields. If fields is null, the REST api is getting called, else
   * the GraphQL api service is used
   *
   * @param id
   * @param fields
   */
  public getById(id: number, fields?: String[]): Observable<TrayModel[]> {
    return new Observable<TrayModel[]>(subscriber => {
      if (fields) {
        this.getByIdGraphQL(fields, id, subscriber)
      } else {
        this.getByIdRest(subscriber, id)
      }
    })
  }

  /**
   * returns all tray depending on the value of fields. If fields is
   * null, the REST api is getting called, else the GraphQL api service
   * is used.
   * @param parameters
   * @param fields
   */
  public get(parameters?: { [key: string]: any; }, fields?: String[]): Observable<TrayModel[]> {
    return new Observable<TrayModel[]>(
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
   * Deletes the tray with the given id
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
   * Saves the given tray into the database
   * @param record
   */
  public save(record: TrayModel): Observable<TrayModel> {
    return new Observable<TrayModel>(subscriber => {
      this.restApi.save(record, savedRecord => {
        try {
          subscriber.next(new TrayModel(savedRecord))
          subscriber.complete()
        } catch (e) {
          basicAPIErrorHandler(subscriber, e)
        }
      }, error => {
        basicAPIErrorHandler(subscriber, error)
      })
    })
  }

  private getByIdGraphQL(fields: String[], id: number, subscriber: Subscriber<TrayModel[]>) {
    let query = `query trayById($id: Int!){trayById(id: $id) {${fields.join(',')}}}`
    this.graphQl.request(query, {id: id}).subscribe(value => {
      this.parseResponse(value.data.trayById, subscriber)
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getByIdRest(subscriber: Subscriber<TrayModel[]>, id: number) {
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

  private getGraphQL(fields: String[], parameters: { [p: string]: any } | undefined, subscriber: Subscriber<TrayModel[]>) {
    let query = `query trays{trays{${fields.join(',')}}}`
    this.graphQl.request(query, parameters).subscribe(value => {
      this.parseResponse(value.data.trays, subscriber);
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getREST(subscriber: Subscriber<TrayModel[]>, parameters?: { [p: string]: any }) {
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

  private parseResponse(records: TrayModel[], subscriber: Subscriber<TrayModel[]>) {
    let parsedCustomers: TrayModel[] = []
    records.forEach((tray: TrayModel) => {
      parsedCustomers.push(new TrayModel(tray))
    })
    subscriber.next(parsedCustomers)
    subscriber.complete()
  }

  private parseSelectOptions(records: TrayModel[]): FormSelectOption[] {
    let options: FormSelectOption[] = []
    records.forEach(value => {
      options.push({
        value: value.id,
        label: value.label || ""
      })
    })
    return options
  }
}
