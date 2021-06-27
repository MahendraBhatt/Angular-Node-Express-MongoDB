import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private User: UserService, private router: Router, private formBuilder: FormBuilder) { }

  forgotPasswordForm = new FormGroup({});
  loading = false;
  submitted = false;
  mailSent = false;
  error = '';

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get f() { return this.forgotPasswordForm.controls; }

  forgotPassword() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    this.User.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (data: any) => {
        this.mailSent = true;
      },
      (err: HttpErrorResponse) => {
        this.error = err.error.error;
        this.loading = false;
        this.submitted = false;
      }
    );
  }
}
