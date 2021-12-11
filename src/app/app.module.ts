import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobxAngularModule} from 'mobx-angular';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { AppStartupService, startupServiceFactory } from './core/services/app-startup.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MobxAngularModule],
  providers: [
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
