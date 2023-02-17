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
import {PartTypeModel} from "../models/PartType.model";


@Injectable({
  providedIn: 'root'
})
export class PartTypeService implements DataProviderService<PartTypeModel>, DataTransformationService<PartTypeModel>, FormOptionsProvider {

  private restApi

  constructor(
    private api: RestApiService,
    private graphQl: GraphQlApiService,
  ) {
    this.restApi = this.api.for<PartTypeModel>("partType")
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
   * Returns the partType with the given id, depending on the value of
   * fields. If fields is null, the REST api is getting called, else
   * the GraphQL api service is used
   *
   * @param id
   * @param fields
   */
  public getById(id: number, fields?: String[]): Observable<PartTypeModel[]> {
    return new Observable<PartTypeModel[]>(subscriber => {
      if (fields) {
        this.getByIdGraphQL(fields, id, subscriber)
      } else {
        this.getByIdRest(subscriber, id)
      }
    })
  }

  /**
   * returns all partType depending on the value of fields. If fields is
   * null, the REST api is getting called, else the GraphQL api service
   * is used.
   * @param parameters
   * @param fields
   */
  public get(parameters?: { [key: string]: any; }, fields?: String[]): Observable<PartTypeModel[]> {
    return new Observable<PartTypeModel[]>(
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
   * Deletes the partType with the given id
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
   * Saves the given partType into the database
   * @param record
   */
  public save(record: PartTypeModel): Observable<PartTypeModel> {
    return new Observable<PartTypeModel>(subscriber => {
      this.restApi.save(record, savedRecord => {
        try {
          subscriber.next(new PartTypeModel(savedRecord))
          subscriber.complete()
        } catch (e) {
          basicAPIErrorHandler(subscriber, e)
        }
      }, error => {
        basicAPIErrorHandler(subscriber, error)
      })
    })
  }

  private getByIdGraphQL(fields: String[], id: number, subscriber: Subscriber<PartTypeModel[]>) {
    let query = `query partTypeById($id: Int!){partTypeById(id: $id) {${fields.join(',')}}}`
    this.graphQl.request(query, {id: id}).subscribe(value => {
      this.parseResponse(value.data.partTypeById, subscriber)
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getByIdRest(subscriber: Subscriber<PartTypeModel[]>, id: number) {
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

  private getGraphQL(fields: String[], parameters: { [p: string]: any } | undefined, subscriber: Subscriber<PartTypeModel[]>) {
    let query = `query partTypes{partTypes{${fields.join(',')}}}`
    this.graphQl.request(query, parameters).subscribe(value => {
      this.parseResponse(value.data.partTypes, subscriber);
    }, error => {
      basicAPIErrorHandler(subscriber, error)
    })
  }

  private getREST(subscriber: Subscriber<PartTypeModel[]>, parameters?: { [p: string]: any }) {
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

  private parseResponse(records: PartTypeModel[], subscriber: Subscriber<PartTypeModel[]>) {
    let parsedCustomers: PartTypeModel[] = []
    records.forEach((partType: PartTypeModel) => {
      parsedCustomers.push(new PartTypeModel(partType))
    })
    subscriber.next(parsedCustomers)
    subscriber.complete()
  }

  private parseSelectOptions(records: PartTypeModel[]): FormSelectOption[] {
    let options: FormSelectOption[] = []
    records.forEach(value => {
      options.push({
        value: value.id,
        label: value.type || ""
      })
    })
    return options
  }
}
