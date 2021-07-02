import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Http } from "@nativescript/core";
import { alert, prompt } from "@nativescript/core/ui/dialogs";
import { getString, remove } from '@nativescript/core/application-settings';
// import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';

@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    message = "You have successfully authenticated. This is where you build your core application functionality.";
    isLoggingIn = true;
    items = [];
//    image = new Image();

    constructor(private router: Router) {
    }

    alert(message: string) {
        return alert({
            title: "Cloud Asset",
            okButtonText: "OK",
            message: message
        });
    }

    ngOnInit(): void {
        Http.request({
            url: 'https://cloudasset.el.r.appspot.com/api/rf?page=0&size=10&sortBy=valveNo&select=valveNo tagNo',
            //url: 'https://httpbi554n.org/get',
            headers: {
                Authorization: `Bearer ` + getString('token')
            },
            method: 'GET'
        }).then(
            (response) => {
                const result = response.content.toJSON();
                this.items = result.rf;
            },
            e => {
                //this.alert(`Error: ${e}`)
            }
        )
    }

    // startCamera() {
    //     requestCameraPermissions().then(
    //         function success() {
    //             takePicture().then(function (imageAsset) {
    //                 //var image = new Image();
    //                 this.image.src = imageAsset.toString();
    //               })
    //               .catch(function (err) {
    //                 console.log('Error -> ' + err.message)
    //               })
    //             // permission request accepted or already granted
    //             // ... call camera.takePicture here ...
    //         },
    //         function failure() {
    //             // permission request rejected
    //             // ... tell the user ...
    //         }
    //     )
    // }

    submit() {
        remove('token');
        this.isLoggingIn = false;
        this.router.navigate([""]);
    }

    onItemTap(args) {
        console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.items[args.index]}`);
    }
}
