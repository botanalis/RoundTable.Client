import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MeetService {

  constructor(
    private http: HttpClient
  ) { }

  list() {
    const url = `${environment.apiUrl}/Meet/list`;
    return this.http.get(url);
  }

}
