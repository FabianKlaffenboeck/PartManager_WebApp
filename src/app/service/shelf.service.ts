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
import {ShelfModel} from "../models/Shelf.model";


@Injectable({
  providedIn: 'root'
})
export class ShelfService implements DataProviderService<ShelfModel>, DataTransformationService<ShelfModel>, FormOptionsProvider {

  private restApi

  constructor(
    private api: RestApiService,
  ) {
    this.restApi = this.api.for<ShelfModel>("shelf")
  }

  /**
   * Returns a list of formSelectOptions, which is the bound to the
   * SelectOption
   */
  public getFormSelectOptions(filterParameters: { [key: string]: any; } = {}): Observable<FormSelectOption[]> {
    return new Observable<FormSelectOption[]>(subscriber => {
      this.get(filterParameters).subscribe(records => {
        subscriber.next(this.parseSelectOptions(records))
        subscriber.complete()
      })
    })
  }

  /**
   * Returns the shelf with the given id, depending on the value of
   * fields. If fields is null, the REST api is getting called, else
   * the GraphQL api service is used
   *
   * @param id
   * @param fields
   */
  public getById(id: number): Observable<ShelfModel[]> {
    return new Observable<ShelfModel[]>(subscriber => {
        this.getByIdRest(subscriber, id)
    })
  }

  /**
   * returns all shelf depending on the value of fields. If fields is
   * null, the REST api is getting called, else the GraphQL api service
   * is used.
   * @param parameters
   * @param fields
   */
  public get(parameters?: { [key: string]: any; }): Observable<ShelfModel[]> {
    return new Observable<ShelfModel[]>(
      subscriber => {
          this.getREST(subscriber, parameters);
      }
    )
  }

  /**
   * Deletes the shelf with the given id
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
   * Saves the given shelf into the database
   * @param record
   */
  public save(record: ShelfModel): Observable<ShelfModel> {
    return new Observable<ShelfModel>(subscriber => {
      this.restApi.save(record, savedRecord => {
        try {
          subscriber.next(new ShelfModel(savedRecord))
          subscriber.complete()
        } catch (e) {
          basicAPIErrorHandler(subscriber, e)
        }
      }, error => {
        basicAPIErrorHandler(subscriber, error)
      })
    })
  }

  private getByIdRest(subscriber: Subscriber<ShelfModel[]>, id: number) {
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

  private getREST(subscriber: Subscriber<ShelfModel[]>, parameters?: { [p: string]: any }) {
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

  private parseResponse(records: ShelfModel[], subscriber: Subscriber<ShelfModel[]>) {
    let parsedCustomers: ShelfModel[] = []
    records.forEach((shelf: ShelfModel) => {
      parsedCustomers.push(new ShelfModel(shelf))
    })
    subscriber.next(parsedCustomers)
    subscriber.complete()
  }

  private parseSelectOptions(records: ShelfModel[]): FormSelectOption[] {
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
