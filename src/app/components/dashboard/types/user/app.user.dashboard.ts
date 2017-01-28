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
    availableSlots:any = [];
    myBookings:any = [];
    previousSelectedSlot:any;
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
        this.selectedSlot = {};
    }
    fetchLocations(){
        let _self = this;
        this.dataService.fetchLocations()
        .then(
            data=>{
                _self.locations = data;
                this.updatefiltered();
                this.updateMyBookings();
                console.log(`${data} from fetchLocations in user dashboard`);
            },
            err=>{
                console.log(`${err} fromo fetchLocations in UserDashboard`);
            }
            
        )
        
    }
    updatefiltered(){
          this.locations.forEach((item,i)=>{
              this.availableSlots[i] = item.slots.filter(obj=>obj.bookedBy=='');
          });
    }
    updateMyBookings(){
        let _self = this;
        this.myBookings = [];
        this.locations.forEach((item,i)=>{
              this.myBookings = this.myBookings
              .concat(
                  item.slots
                    .filter(
                            obj=>{
                                obj.bookedBy==_self.user.$key && (obj['location']=item.$key);
                                return obj.bookedBy==_self.user.$key
                        })
                  );
          });
    }
    updateSlots(location){
         this.currentSelectedSlots = [];
        location.slots.forEach(slot=>{
            slot['selected'] = false;
            this.currentSelectedSlots.push(slot) ;
        })
        this.selectedSlot['location'] = location.$key;
    }
    reserveParking(){
        let _data = this.compileData();
       // this.validations(_data);
       this.dataService.reserveParking(_data)
       .then(
           data=>{
               alert('parking booked successfully');
               this.clearModel();
               this.fetchLocations();
           },er=>{
               this.clearModel();
           }
       )

    }
    removeParking(data){
        this.dataService.removeParking(data)
       .then(
           data=>{
               this.clearModel();
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
    
    selectSlot(selectedSlot,i){
        this.selectedSlot['slot'] = selectedSlot;
        this.currentSelectedSlots[i]['selected'] = !0;
        if(this.previousSelectedSlot != undefined){
            this.currentSelectedSlots[this.previousSelectedSlot]['selected'] = false;
        }
        this.previousSelectedSlot = i;
        console.log(`${this.selectedSlot}`);
    }
}