import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  postUrl='https://localhost:7053/Auth';
  forgetPasswordUrl: any;
  constructor(private http: HttpClient,
  ) {
   
  }

  login(username: string, password: string): Observable<any> {
    const data = { userName: username, password: password };
    return this.http.post(this.postUrl, data)
      .pipe(map(this.setAuth),
        catchError(this.handleError)
      );
  }
  public logout() {
    localStorage.removeItem('currentUser');
  }
  forgotPassword(userName: string) {
    const data = { userName: userName };
    let url = `${this.forgetPasswordUrl}?userName=${userName}`;
    return this.http.post(url, data)
      .pipe(map(this.setAuth),
        catchError(this.handleError)
      );
  }
  changePassword(data: any): Observable<any> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser.token
        })
    };
    let url = this.postUrl;
    return this.http.post(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private setAuth(res: any) {
    const body = res;
    if (res.isSuccess && res.data) {
      localStorage.setItem('currentUser', JSON.stringify({ username: res.data.firstName, roleID: res.data.fkRoleID, userID: res.data.pkUserID, subscriptionDate: res.data.subscriptionDate, token: res.data.token, menu: res.data.menuAccesses, updatedBy: res.data.updatedBy, updatedDate: res.data.updatedDate }));
    }
    return body || {};
  }
}
