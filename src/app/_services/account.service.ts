import { Injectable } from '@angular/core';
import {User} from "../_models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  register(user: User) {
    const url = `${environment.apiUrl}}/users/register`;
    return this.http.post(url, user);
  }
}
