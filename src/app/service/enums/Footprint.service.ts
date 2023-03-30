import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {basicAPIErrorHandler} from "../data-provider.service";
import {RestApiService} from "../rest-api.service";


@Injectable({
  providedIn: 'root'
})
export class FootprintService {

  private restApi

  constructor(
    private api: RestApiService,
  ) {
    this.restApi = this.api.for<string>("footprint")
  }

  /**
   * returns all PartTypes
   */
  public get(): Observable<string[]> {
    return new Observable<string[]>(
      subscriber => {
        this.restApi.get(records => {
          try {
            subscriber.next(records)
          } catch (e) {
            basicAPIErrorHandler(subscriber, e)
          }
        }, error => {
          basicAPIErrorHandler(subscriber, error)
        })
      }
    )
  }
}
