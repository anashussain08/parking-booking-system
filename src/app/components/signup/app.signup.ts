import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

@Component({
    selector:'signup',
    templateUrl:'./app.signup.html',
    styleUrls:['./app.signup.css']
})

export class SignUp implements OnInit{
    model:any;
   types:any = ['User','Admin'];
   spinner:boolean = false;
   constructor(public authService:AuthService, public router:Router){

    }
    ngOnInit(){
        this.clearModel();
    }
     clearModel(){
        this.model = {
            email:'',
            username:'',
            password:'',
            type:''
        }
    }
      onSignUp(){
        let self = this;
        this.spinner = !0;
        this.authService.register(this.model)
        .then(data=>{
            this.router.navigate(['/dashboard'])
            this.spinner = false;
            this.clearModel();
        })
        .catch(err=>{
            console.log(err);
            this.clearModel();
            this.spinner = false;
        })
        // this.createUserAf()
        // .then(data=>{
        //     console.log(`user created! ${data}`);
        //     this.loginUser();
        // })
        // .catch(err=>console.log(err));
    }
    cancel(){
        this.clearModel();
    }

}