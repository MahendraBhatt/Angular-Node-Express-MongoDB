import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "@nativescript/core/ui/dialogs";
import { Page } from "@nativescript/core/ui/page";
import { Http } from '@nativescript/core';
import { getString, setString } from '@nativescript/core/application-settings';


import { User } from "~/shared/user.model";
//import { UserService } from "~/shared/user.service";
@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    isLoggingIn = true;
    user: User;
    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    constructor(private page: Page, 
        //private userService: UserService, 
        private router: Router) {
        this.page.actionBarHidden = true;
        this.user = new User();
        // this.user.email = "foo2@foo.com";
        // this.user.password = "foo";
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        // Http.request({
        //     url: 'https://httpbin.org/get',
        //     //url: 'https://httpbi554n.org/get',
        //     method: 'GET'
        //   }).then(
        //     (response) => {
        //       // Argument (response) is HttpResponse
        //       this.alert(`Response Status Code: ${response.statusCode}`)
        //       console.log(`Response Headers: ${response.statusCode}`)
        //       console.log(`Response Content: ${response.content}`)
        //     },
        //     e => {
        //         this.alert(`Error: ${e}`)
        //     }
        //   )

        //this.router.navigate(["/home"]);
        
        Http.request({
            url: "https://cloudasset.el.r.appspot.com/api/user/login",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
              email: this.user.email,
              password: this.user.password,
            }),
          }).then(
            (response) => {
                const result = response.content.toJSON();
                if(response.statusCode == 200){
                    //console.log(response);
                    setString("token", result.token.toString());
                    this.isLoggingIn = true;
                    this.router.navigate(["/home"]);
                } else {
                    this.alert(result.msg)
                }
            },
            (e) => {
                console.log(e);
                this.alert(`Error: ${e}`)
            }
          );
    }

    register() {
        if (this.user.password != this.user.confirmPassword) {
            this.alert("Your passwords do not match.");
            return;
        }
        // this.userService.register(this.user)
        //     .then(() => {
        //         this.alert("Your account was successfully created.");
        //         this.isLoggingIn = true;
        //     })
        //     .catch(() => {
        //         this.alert("Unfortunately we were unable to create your account.");
        //     });
    }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for Cloud Asset to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                Http.request({
                    url: "https://cloudasset.el.r.appspot.com/api/user/forgotPassword",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                      email: data.text.trim()
                    }),
                  }).then(
                    (response) => {
                        if(response.statusCode == 200){
                            this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                        } else {
                            const result = response.content.toJSON();
                            this.alert(result.error)
                        }
                    },
                    (e) => {
                        console.log(e);
                        this.alert(`Error: ${e}`)
                        //this.alert("Unfortunately, an error occurred resetting your password.");
                    }
                  );
                
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "Cloud Asset",
            okButtonText: "OK",
            message: message
        });
    }
}

