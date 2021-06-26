import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private User: UserService, private router: Router, private formBuilder: FormBuilder) { }

  loginForm = new FormGroup({});
  loading = false;
  submitted = false;
  returnUrl = '';
  error = '';

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  loginUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.User.userLogin(this.loginForm.value).subscribe(
      (data: any) => {
        let token = data.token;
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        this.error = err.error.msg;
        this.loading = false;
        this.submitted = false;
      }
    );
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

}
