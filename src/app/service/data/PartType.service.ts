import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {
  basicAPIErrorHandler,
  DataProviderService,
  DataTransformationService,
  FormOptionsProvider,
  FormSelectOption
} from "../data-provider.service";
import {RestApiService} from "../rest-api.service";
import {PartTypeModel} from "../models/PartType.model";


@Injectable({
  providedIn: 'root'
})
export class PartTypeService implements DataProviderService<PartTypeModel>, DataTransformationService<PartTypeModel>, FormOptionsProvider {

  private restApi

  constructor(
    private api: RestApiService,
  ) {
    this.restApi = this.api.for<PartTypeModel>("partTypes")
  }

  public getFormSelectOptions(filterParameters: { [key: string]: any; } = {}): Observable<FormSelectOption[]> {
    return new Observable<FormSelectOption[]>(subscriber => {
      this.get(filterParameters).subscribe(records => {
        subscriber.next(this.parseSelectOptions(records))
        subscriber.complete()
      })
    })
  }

  public getById(id: number): Observable<PartTypeModel[]> {
    return new Observable<PartTypeModel[]>(subscriber => {
      this.restApi.getById(id, record => {
        try {
          this.parseResponse([record], subscriber);
        } catch (e) {
          basicAPIErrorHandler(subscriber, e)
        }
      }, error => {
        basicAPIErrorHandler(subscriber, error)
      })
    })
  }

  public get(parameters?: { [key: string]: any; }): Observable<PartTypeModel[]> {
    return new Observable<PartTypeModel[]>(
      subscriber => {
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
    )
  }

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
        label: value.name || ""
      })
    })
    return options
  }
}
