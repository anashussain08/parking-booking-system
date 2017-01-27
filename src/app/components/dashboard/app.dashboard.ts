import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { AuthService } from './../../services/auth.service';
//import {StudentDashboard} from './types/studentDashboard/app.studentDashboard';
//import {CompanyDashboard} from './types/companyDashboard/app.companyDashboard';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
    selector:'dashboard',
    templateUrl:'./app.dashboard.html',
    styleUrls:['./app.dashboard.css']
})

export class Dashboard implements OnInit{
    user:any;
    constructor(public authService:AuthService){

    }
    ngOnInit(){
        this.user = this.authService.User;
    }

}