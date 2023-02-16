import {Observable, Subscriber} from "rxjs";

/**
 * Asynchronous Access to Arrays of the specified tyoe
 */
export interface DataProviderService<T> {
  // getById(id: number | string, fields?: String[]): Observable<T[]>
  get(parameters?: { [key: string]: any; }, fields?: String[]): Observable<T[]>
}

/**
 * Access to update method of a record
 */
export interface DataTransformationService<T> {
  save(record: T): Observable<T>
  delete(id: number): Observable<any>
}

/**
 * contains a method which provides access to an Observable of FormSelectOption[]
 */
export interface FormOptionsProvider {
  getFormSelectOptions(filterParameters: { [key: string]: any; }): Observable<FormSelectOption[]>
}

/**
 * An option for the select from
 *
 * `value` MUST be of the same type as the linked field, otherwise the current value will not be
 * selected in the dropdown
 */
export interface FormSelectOption {
  value: any
  label: string
}

/**
 * Basic API Error handler, which logs errors to the console, and then passes it on to any subscriber
 */
export function basicAPIErrorHandler(subscriber: Subscriber<any>, error: any) {
  console.error(error)
  subscriber.error(error)
  subscriber.complete()
}
