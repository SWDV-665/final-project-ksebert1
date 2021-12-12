import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobxAngularModule} from 'mobx-angular';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { AppStartupService, startupServiceFactory } from './core/services/app-startup.service';
import { STORE_CONFIG } from './core/constants/store-config';
import { IonicStorageModule } from '@ionic/storage-angular';
import {Drivers, Storage} from '@ionic/storage';
import {Camera} from '@ionic-native/camera/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    MobxAngularModule,
    IonicStorageModule.forRoot({
      name: STORE_CONFIG.DATABASE_NAME,
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })],
    // IonicStorageModule.forRoot()],
  providers: [
    Camera,
    SQLite,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppStartupService],
      useFactory: startupServiceFactory
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
