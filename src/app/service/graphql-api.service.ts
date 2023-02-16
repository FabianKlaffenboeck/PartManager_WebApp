import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

/**
 * This service provides access to the GraphQL API
 */
@Injectable()
export class GraphQlApiService {
  constructor(
    private http: HttpClient,
    // private session: SessionService
  ) {
  }

  private graphQlApiServerUrl = "http://localhost:8080/graphQlPath"

  request(query: String, parameters?: { [key: string]: any; }): Observable<any> {
    return new Observable<any>(subscriber => {
      this.http.post<any>(this.graphQlApiServerUrl,
        JSON.stringify({query, variables: parameters}), {
          // headers: this.session.generateAuthHeader(new HttpHeaders())
        }
      ).subscribe(
        value => {
          subscriber.next(value)
          subscriber.complete()
        }, error => {
          subscriber.error(error)
          subscriber.complete()
        }
      )
    })
  }
}
