import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonMasterService {
  urlAddress!: string;

  constructor(
    private http: HttpClient,
) {
   
  }
  public getData(): Observable<any> {
    return this.http.get(this.createCompleteRoute('Common', this.urlAddress));
  }
  public getDataByID(id: any): Observable<any> {
    return this.http.get(`${this.createCompleteRoute('Common', this.urlAddress)}${'/'}${id}`,)
      .pipe(map(res => res),
        catchError(this.errorHandler)
      );
  }
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}${route}`;
  }
  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}
