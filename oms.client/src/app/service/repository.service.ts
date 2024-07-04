import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class RepositoryService {
  urlAddress!: string;

  constructor(private http: HttpClient) {
  }

  public getData(route: string): Observable<any> {
    return this.http.get(this.createCompleteRoute(route, this.urlAddress), this.generateHeaders());
  }

  public create(route: string, body: any): Observable<any> {
    return this.http.post(this.createCompleteRoute(route, this.urlAddress), body, this.generateHeaders());
  }

  public update(route: string, body: any): Observable<any> {
    return this.http.post(this.createCompleteRoute(route, this.urlAddress), body, this.generateHeaders());
  }

  public delete(route: string): Observable<any> {
    return this.http.post(this.createCompleteRoute(route, this.urlAddress), "", this.generateHeaders());
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}${route}`;
  }

  private generateHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    let token: string;
    if (currentUser) {
      token = currentUser.token;
    }
    return {
      headers: new HttpHeaders(
        {

          'Content-Type': 'application/json',
          'charset': 'utf-8',
          //  Authorization: `bearer ${token}`
        })
    };

  }
}
