import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService, AuthenticationService} from "../../_services";
import {first} from "rxjs/operators";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.form = new FormGroup({});
    if (this.authenticationService.optUserInfo) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      account: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.account.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (res) => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );

  }

}
