import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  helper = new JwtHelperService();
  token = '';
  tokenExpired = false;
  resetPasswordForm = new FormGroup({});
  loading = false;
  submitted = false;
  passwordResetDone = false;
  error = '';
  name = '';
  email = '';

  constructor(private User: UserService,
    private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  get f() { return this.resetPasswordForm.controls; }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    }, {
      validator: this.ConfirmedValidator('password', 'confirmpassword')
    });


    this.route.queryParams.subscribe(params => {
      this.token = params['t'];
    });

    if (this.token !== undefined) {
      try {
        const isExpired = this.helper.isTokenExpired(this.token);
        if (isExpired) {
          this.tokenExpired = true;
        } else {
          var t = this.helper.decodeToken(this.token).u;
          this.name = t.name;
          this.email = t.email;
        }
      } catch (err) {
        console.log(err);
        this.tokenExpired = true;
      }
    } else {
      this.tokenExpired = true;
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  resetPassword() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    localStorage.setItem('token', this.token);

    this.User.setPassword(this.resetPasswordForm.value).subscribe(
      (data: any) => {
        this.passwordResetDone = true;
        this.loading = false;
        this.submitted = false;
        localStorage.removeItem('token');
      },
      (err: HttpErrorResponse) => {
        this.error = err.error.error;
        this.loading = false;
        this.submitted = false;
        localStorage.removeItem('token');
      }
    );
  }
}
