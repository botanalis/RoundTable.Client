import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../_models";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const LOCAL_STORAGE_OPT_USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private optUserSubject: BehaviorSubject<User | null>;
  public optUser: Observable<User | null>;
  private refreshTokenTimeOut: any;

  constructor(
    private http: HttpClient
  ) {
    this.optUserSubject = new BehaviorSubject<User | null>(JSON.parse(<string>localStorage.getItem(LOCAL_STORAGE_OPT_USER_KEY)));
    this.optUser = this.optUserSubject.asObservable();
  }

  public get optUserInfo(): User {
    return <User>this.optUserSubject.value;
  }

  login(account: string, password: string) {
    const url = `${environment.apiUrl}/Users/Login`;
    return this.http.post<User>(url, {account, password})
      .pipe(map(user => {
        localStorage.setItem(LOCAL_STORAGE_OPT_USER_KEY, JSON.stringify(user));
        this.optUserSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  refreshToken() {
    const url = `${environment.apiUrl}/Users/RefreshToken`;
    return this.http.get<User>(url)
      .pipe(map((user) => {
        localStorage.setItem(LOCAL_STORAGE_OPT_USER_KEY, JSON.stringify(user));
        this.optUserSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  logout() {
    const url = `${environment.apiUrl}/Users/LogOut`;
    this.http.get(url).subscribe();
    this.stopRefreshTokenTimer();
    localStorage.removeItem(LOCAL_STORAGE_OPT_USER_KEY);
    this.optUserSubject.next(null);
  }

  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.optUserInfo.token.split('.')[1]));

    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeOut = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeOut);
  }
}
