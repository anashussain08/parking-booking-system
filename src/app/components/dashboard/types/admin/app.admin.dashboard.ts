import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { AuthService } from './../../../../services/auth.service';
import { DataService } from './../../../../services/data.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';


@Component({
    selector:'admin-dashboard',
    templateUrl:'./app.admin.dashboard.html',
    styleUrls:['./app.admin.dashboard.css']
})

export class AdminDashboard implements OnInit{
    allUsers:any;
    allLocations:any;
    allSlots:any;
    feedbacks:any=[];
    constructor(public authService:AuthService, public dataService:DataService){

    }
    ngOnInit(){
        this.fetchUsers();
        this.fetchLocations();
        this.fetchFeedbacks();
    }
    fetchUsers(){
        this.dataService.fetchUsers()
        .subscribe(
            data=>{
                this.allUsers = data;
            },
            err=>{

            },
            ()=>{}
        )
        
    }
    fetchLocations(){
        this.dataService.fetchLocations()
        .then(
            data=>{
                this.allLocations = data;
                this.getSlots();
            }
        )
        .catch(e=>{

        })
    }
    fetchFeedbacks(){
        this.dataService.fetchFeedBacks()
        .subscribe(
            data=>{
                this.feedbacks = data;
            },
            err=>{

            },
            ()=>{

            }
        )
    }
   
    getSlots(){
        this.allSlots = [];
          this.allLocations.forEach((item,i)=>{
              this.allSlots.push(item.slots);
          });
          this.allSlots;
    }
    removeUser(user){
        this.dataService.removeUser(user.$key)
        .subscribe(
            data=>{
              this.fetchUsers();
            },
            err=>{

            },
            ()=>{

            }
        )
    }
    removeBooking(slot,index){
        let sure = prompt('Are you sure to remove this booking?');
        if(sure!=null){
            let _data = {location:'location'+index,name:slot.name};
             this.dataService.removeParking(_data)
                .then(
                    data=>{
                        this.fetchLocations();
                    },er=>{
                        alert(er);
                    }
                )
        }
    }
}