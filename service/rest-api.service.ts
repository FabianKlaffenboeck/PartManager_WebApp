import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../src/environments/environment";


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

  private restApiServerUrl = environment.apiUrl
  private static _apiClientInstances: { [key: string]: RestApiClient<any> } = {}

  for<T extends Record | any>(resource: string): RestApiClient<T> {
    if (RestApiService._apiClientInstances[resource] == undefined) {
      RestApiService._apiClientInstances[resource] = new RestApiClient<T>(resource, this.http, this.restApiServerUrl)
    }
    return RestApiService._apiClientInstances[resource]
  }
}

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

    this.http.post<T>(`${this.apiServerUrl}/${this.apiResource}`, record,
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
    this.http.post<T>(`${this.apiServerUrl}/${this.apiResource}}`,
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

  get(
    onSuccess: (records: T[]) => void,
    onError: (error: HttpErrorResponse) => void = () => {
    },
    parameters: { [key: string]: any; } = {},
  ) {
    let url = `${this.apiServerUrl}/${this.apiResource}?`

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
