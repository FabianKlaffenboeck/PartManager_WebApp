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
import {FootprintModel} from "../models/Footprint.model";
import {MeasurementUnitModel} from "../models/MeasurementUnit.model";


@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService implements DataProviderService<MeasurementUnitModel>, DataTransformationService<MeasurementUnitModel>, FormOptionsProvider {

  private restApi

  constructor(
    private api: RestApiService,
  ) {
    this.restApi = this.api.for<MeasurementUnitModel>("measurementUnits")
  }

  public getFormSelectOptions(filterParameters: { [key: string]: any; } = {}): Observable<FormSelectOption[]> {
    return new Observable<FormSelectOption[]>(subscriber => {
      this.get(filterParameters).subscribe(records => {
        subscriber.next(this.parseSelectOptions(records))
        subscriber.complete()
      })
    })
  }

  public getById(id: number): Observable<MeasurementUnitModel[]> {
    return new Observable<MeasurementUnitModel[]>(subscriber => {
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

  public get(parameters?: { [key: string]: any; }): Observable<MeasurementUnitModel[]> {
    return new Observable<MeasurementUnitModel[]>(
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

  public save(record: MeasurementUnitModel): Observable<MeasurementUnitModel> {
    return new Observable<MeasurementUnitModel>(subscriber => {
      this.restApi.save(record, savedRecord => {
        try {
          subscriber.next(new MeasurementUnitModel(savedRecord))
          subscriber.complete()
        } catch (e) {
          basicAPIErrorHandler(subscriber, e)
        }
      }, error => {
        basicAPIErrorHandler(subscriber, error)
      })
    })
  }

  private parseResponse(records: MeasurementUnitModel[], subscriber: Subscriber<MeasurementUnitModel[]>) {
    let parsedCustomers: MeasurementUnitModel[] = []
    records.forEach((measurementUnit: MeasurementUnitModel) => {
      parsedCustomers.push(new MeasurementUnitModel(measurementUnit))
    })
    subscriber.next(parsedCustomers)
    subscriber.complete()
  }

  private parseSelectOptions(records: MeasurementUnitModel[]): FormSelectOption[] {
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
