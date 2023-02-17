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
import {PartModel} from "../models/Part.model";


@Injectable({
  providedIn: 'root'
})
export class PartService implements DataProviderService<PartModel>, DataTransformationService<PartModel>, FormOptionsProvider {

  private restApi

  constructor(
    private api: RestApiService,
    private graphQl: GraphQlApiService,
  ) {
    this.restApi = this.api.for<PartModel>("part")
  }

  /**
   * Returns a list of formSelectOptions, which is the bound to the
   * SelectOption
   */
  public getFormSelectOptions(filterParameters: { [key: string]: any; } = {}): Observable<FormSelectOption[]> {
    return new Observable<FormSelectOption[]>(subscriber => {
      this.get(filterParameters, ["id", "partType"]).subscribe(records => {
        subscriber.next(this.parseSelectOptions(records))
        subscriber.complete()
      })
    })
  }

  /**
   * Returns the part with the given id, depending on the value of
   * fields. If fields is null, the REST api is getting called, else
   * the GraphQL api service is used
   *
   * @param id
   * @param fields
   */
  public getById(id: number, fields?: String[]): Observable<PartModel[]> {
    return new Observable<PartModel[]>(subscriber => {
      if (fields) {
        this.getByIdGraphQL(fields, id, subscriber)
      } else {
        this.getByIdRest(subscriber, id)
      }
    })
  }

  /**
   * returns all part depending on the value of fields. If fields is
   * null, the REST api is getting called, else the GraphQL api service
   * is used.
   * @param parameters
   * @param fields
   */
  public get(parameters?: { [key: string]: any; }, fields?: String[]): Observable<PartModel[]> {
    return new Observable<PartModel[]>(
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
   * Deletes the part with the given id
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
   * Saves the given part into the database
   * @param record
   */
  public save(record: PartModel): Observable<PartModel> {
    return new Observable<PartModel>(subscriber => {
      this.restApi.save(record, savedRecord => {
        try {
          subscriber.next(new PartModel(savedRecord))
          subscriber.complete()
        } catch (e) {
          basicAPIErrorHandler(subscriber, e)
        }
      }, error => {
        basicAPIErrorHandler(subscriber, error)
      })
    })
  }

  private getByIdGraphQL(fields: String[], id: number, subscriber: Subscriber<PartModel[]>) {
    let query = `query partById($id: Int!){partById(id: $id) {${fields.join(',')}}}`
    this.graphQl.request(query, {id: id}).subscribe(value => {
      this.parseResponse(value.data.partById, subscriber)
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getByIdRest(subscriber: Subscriber<PartModel[]>, id: number) {
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

  private getGraphQL(fields: String[], parameters: { [p: string]: any } | undefined, subscriber: Subscriber<PartModel[]>) {
    let query = `query parts{parts{${fields.join(',')}}}`
    this.graphQl.request(query, parameters).subscribe(value => {
      this.parseResponse(value.data.parts, subscriber);
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getREST(subscriber: Subscriber<PartModel[]>, parameters?: { [p: string]: any }) {
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

  private parseResponse(records: PartModel[], subscriber: Subscriber<PartModel[]>) {
    let parsedCustomers: PartModel[] = []
    records.forEach((part: PartModel) => {
      parsedCustomers.push(new PartModel(part))
    })
    subscriber.next(parsedCustomers)
    subscriber.complete()
  }

  private parseSelectOptions(records: PartModel[]): FormSelectOption[] {
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
