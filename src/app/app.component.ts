import { Component } from '@angular/core';
import {User} from "./_models";
import {AuthenticationService} from "./_services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User | null | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.authenticationService.optUser.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }
}
