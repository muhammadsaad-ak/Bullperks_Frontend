import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TokenData {
  name: string;
  totalSupply: number;
  circulatingSupply: number;
}


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = environment.apiUrl;
  private isLoggedIn = false;
  private isAuthenticatedSubject: Subject<boolean> = new Subject<boolean>();
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}/api/Auth/login`, credentials).pipe(
      tap(() => {
        this.setAuthenticated(true); // Set authentication status to true when token is received
      }),
      catchError(() => {
        this.setAuthenticated(false); // Set authentication status to false on error
        throw Error;
      })
    );
  }

  getTokenData(): Observable<TokenData> {
    return this.http.get<TokenData>(`${this.apiUrl}/token-data`);
  }

  updateTokenData(): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/calculate-supply`, {});
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  setAuthenticated(status: boolean) {
    this.isLoggedIn = status;
    this.isAuthenticatedSubject.next(status);
  }
}
