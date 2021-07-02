import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";
import { DrawerModule } from "@nativescript-community/ui-drawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

//import { UserService } from "./shared/user.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        DrawerModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent
    ],
    providers: [
        //UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
