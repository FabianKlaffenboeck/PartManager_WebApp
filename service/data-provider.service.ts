import {Observable, Subscriber} from "rxjs";


export interface DataProviderService<T> {
  get(parameters?: { [key: string]: any; }): Observable<T[]>
}

export interface DataTransformationService<T> {
  save(record: T): Observable<T>
  delete(id: number): Observable<any>
}

export interface FormOptionsProvider {
  getFormSelectOptions(filterParameters: { [key: string]: any; }): Observable<FormSelectOption[]>
}

export interface FormSelectOption {
  value: any
  label: string
}

export function basicAPIErrorHandler(subscriber: Subscriber<any>, error: any) {
  console.error(error)
  subscriber.error(error)
  subscriber.complete()
}
