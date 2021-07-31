import { Component } from '@angular/core';
import {User} from "./_models";
import {AccountService} from "./_services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User | null | undefined;

  constructor(
    private accountService: AccountService
  ) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
  }
}
