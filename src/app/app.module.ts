import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2'; 
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRouter } from './app.routes';
import { SignUp } from './components/signup/app.signup';
import { Login } from './components/login/app.login';
import { Dashboard } from './components/dashboard/app.dashboard';
import { UserDashboard } from './components/dashboard/types/user/app.user.dashboard';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';


 export const  firebaseConfig = {
    apiKey: "AIzaSyAmZxVYXy54XmJ-6M2n-h0UM7ekcVpFADY",
    authDomain: "parking-booking-system-4c9bb.firebaseapp.com",
    databaseURL: "https://parking-booking-system-4c9bb.firebaseio.com",
    storageBucket: "parking-booking-system-4c9bb.appspot.com",
    messagingSenderId: "383028301149"
  };

@NgModule({
  declarations: [
    AppComponent,
    SignUp,
    Login,
    Dashboard,
    UserDashboard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouter,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot()
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
