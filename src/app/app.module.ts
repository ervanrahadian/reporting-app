import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment.prod';

// service and guard
import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService,
    AdminService,
    AuthGuard,
    AdminGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
