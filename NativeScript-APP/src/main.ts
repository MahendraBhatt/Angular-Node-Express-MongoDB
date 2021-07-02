// // this import should be first in order to load some required settings (like globals and reflect-metadata)
// import { platformNativeScriptDynamic } from '@nativescript/angular'

// import { AppModule } from './app/app.module'

// platformNativeScriptDynamic().bootstrapModule(AppModule)


// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "@nativescript/angular";
import { enableProdMode } from '@angular/core';
import { install } from '@nativescript-community/ui-drawer';
import { AppModule } from "./app/app.module";

install();
enableProdMode();
platformNativeScriptDynamic().bootstrapModule(AppModule);
