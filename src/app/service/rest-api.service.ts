import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";


/**
 * This service provides access to all {@link RestApiClient} instances for each resource,
 * and stores their references internally, so only one client for each unique resource is
 * available at any given time
 */
@Injectable()
export class RestApiService {
  constructor(
    private http: HttpClient,
  ) {
  }


  private restApiServerUrl = "http://localhost:8080"

  private static _apiClientInstances: { [key: string]: RestApiClient<any> } = {}

  /**
   * Access a specific API client, identified by the resource name
   * @param resource Name of the REST resource
   */
  for<T extends Record | any>(resource: string): RestApiClient<T> {
    if (RestApiService._apiClientInstances[resource] == undefined) {
      RestApiService._apiClientInstances[resource] = new RestApiClient<T>(resource, this.http, this.restApiServerUrl)
    }
    return RestApiService._apiClientInstances[resource]
  }
}


/**
 * A Database Records with an ID. All models which use the api service must implement this interface.
 */
export interface Record {
  id: number | string | undefined
}

class RestApiClient<T extends Record | any> {

  constructor(
    private apiResource: string,
    private http: HttpClient,
    private apiServerUrl: string
  ) {
  }

  /**
   * Save the given record on the server.
   *
   * This also updates or adds it in the list, a manual reload is not necessary
   */
  save(
    record: T,
    onSuccess: (savedRecord: T) => void = () => {
    },
    onError: (error: HttpErrorResponse) => void = () => {
    }
  ) {
    if (record === undefined) {
      return
    }

    this.http.post<T>(`${this.apiServerUrl}/${this.apiResource}?userId=${localStorage.getItem('userId')}`, record,
      {}).subscribe(
      (savedRecord: T) => {
        onSuccess(savedRecord)
      },
      (error: HttpErrorResponse) => {
        onError(error)
        console.log(error)
      },
    )
  }

  saveNoPL(
    onSuccess: (savedRecord: T) => void = () => {
    },
    onError: (error: HttpErrorResponse) => void = () => {
    }
  ) {
    this.http.post<T>(`${this.apiServerUrl}/${this.apiResource}?userId=${localStorage.getItem('userId')}`,
      {}).subscribe(
      (savedRecord: T) => {
        onSuccess(savedRecord)
      },
      (error: HttpErrorResponse) => {
        onError(error)
        console.log(error)
      },
    )
  }

  /**
   * Delete the record with the given id from the server.
   *
   * This also removes it from the list, a manual reload is not necessary
   */
  delete(
    id: number,
    onSuccess: () => void = () => {
    },
    onError: (error: HttpErrorResponse) => void = () => {
    }
  ) {
    if (id === undefined) {
      return
    }

    this.http.delete<void>(`${this.apiServerUrl}/${this.apiResource}/${id}`,
      {}).subscribe(
      () => {
        onSuccess()
      },
      (error: HttpErrorResponse) => {
        onError(error)
        console.log(error)
      },
    )
  }

  /**
   * Explicitly fetch a set of records from the API. No default error or success handling is implemented, this
   * must be done using one of both callback functions.
   */
  get(
    onSuccess: (records: T[]) => void,
    onError: (error: HttpErrorResponse) => void = () => {
    },
    parameters: { [key: string]: any; } = {},
    userUserId: boolean = true
  ) {
    let url = `${this.apiServerUrl}/${this.apiResource}?`

    if (userUserId) {
      url = url + `userId=${localStorage.getItem('userId')}&`
    }

    url = url + Object.keys(parameters).map(key => `${key}=${parameters[key].toString()}`).join("&")

    this.http.get<T[]>(url,
      {}).subscribe(
      (records: T[]) => {
        onSuccess(records)
      },
      (error: HttpErrorResponse) => {
        onError(error)
        console.log(error)
      })
  }

  /**
   * get a single record by its id.
   */
  getById(
    id: number,
    onSuccess: (record: T) => void,
    onError: (error: HttpErrorResponse) => void = () => {
    }
  ) {
    let url = `${this.apiServerUrl}/${this.apiResource}/${id}`
    this.http.get<T>(url,
      {}).subscribe(
      record => {
        onSuccess(record)
      }, (error: HttpErrorResponse) => {
        onError(error)
      }
    )
  }
}
