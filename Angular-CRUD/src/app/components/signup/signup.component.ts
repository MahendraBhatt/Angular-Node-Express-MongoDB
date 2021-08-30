import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private User: UserService, private router: Router, private formBuilder: FormBuilder) { }
  error = '';
  signupForm = new FormGroup({});
  loading = false;
  submitted = false;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.signupForm.controls; }

  createUser() {
    this.submitted = true;
    this.signupForm.controls['email'].setErrors(null);
    //console.log(this.signupForm.controls['phoneNumber'].errors);
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    this.User.createNewUser(this.signupForm.value).subscribe(
      (data: any) => {
        this.submitted = false;
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        this.error = err.error.msg;
        if (err.error.message.toLowerCase().indexOf('email already in use') >= 0) {
          this.signupForm.controls['email'].setErrors({ exists: true });
        }
        this.loading = false;
      }
    );
  }

}
