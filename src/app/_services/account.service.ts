import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../_models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

const LOCAL_STORAGE_USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User| null>(JSON.parse(<string>localStorage.getItem(LOCAL_STORAGE_USER_KEY)));
    this.user = this.userSubject.asObservable();
  }

  public get userInfo(): User {
    return <User>this.userSubject.value;
  }

  login(account: string, password: string) {
    const url = `${environment.apiUrl}/users/authenticate`;
    return this.http.post<User>(url, {account, password})
      .pipe(map(user => {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    const url = `${environment.apiUrl}}/users/register`;
    return this.http.post(url, user);
  }
}
