import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { AuthService } from './../../../../services/auth.service';
import { DataService } from './../../../../services/data.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';


@Component({
    selector:'user-dashboard',
    templateUrl:'./app.user.dashboard.html',
    styleUrls:['./app.user.dashboard.css']
})

export class UserDashboard implements OnInit{
    user:any;
    booking:any;
    hours:any = [1,2,3,4,5,6];
    locations:any;
    currentSelectedSlots:any;
    selectedSlot:any = {};
    
    constructor(public authService:AuthService, public dataService:DataService){

    }
    ngOnInit(){
        this.user = this.authService.User;
        this.clearModel();
        this.fetchLocations();
    }
    clearModel(){
        this.booking = {
            date:null,
            time:null,
            selectedhours:null,
            location:null
        };
        this.currentSelectedSlots = [];
    }
    fetchLocations(){
        let _self = this;
        this.dataService.fetchLocations()
        .then(
            data=>{
                _self.locations = data;
                console.log(`${data} from fetchLocations in user dashboard`);
            },
            err=>{
                console.log(`${err} fromo fetchLocations in UserDashboard`);
            }
            
        )
        
    }
    updateSlots(location){
        this.currentSelectedSlots = location.slots;
        this.selectedSlot['location'] = location.$key;
    }
    reserveParking(){
        let _data = this.compileData();
        this.validations(_data);
       this.dataService.reserveParking(_data)
       .then(
           data=>{
               this.fetchLocations();
           },er=>{
               alert(er);
               this.clearModel();
           }
       )

    }
    compileData(){
        let _obj = {
            booking:this.booking,
            selectSlot:this.selectedSlot,
            user:this.user
        };
        return _obj;
    }
    validations(obj){
        if(new Date(obj.booking.date).getTime() < new Date().getTime()){
            throw new Error('You have to select future or current time!')
        }
    }
    cancel(){
        this.clearModel();
    }
    
    selectSlot(selectedSlot){
        this.selectedSlot['slot'] = selectedSlot;
        console.log(`${this.selectedSlot}`);
    }
}