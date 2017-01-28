import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()

export class DataService{
    af:any;
    constructor(af: AngularFire, public router:Router){
        this.af = af;
}
       
    fetchLocations(){
      
        return  new Promise((resolve,reject)=>{
            this.af.database.list('/locations')
            .subscribe(
                dbData=>{
                    resolve(dbData);
                },
                er=>{
                    reject(er);
                },
                ()=>{

                }
                
            )
        });
       
        //return Observable.fromPromise(promise);
    }
    fetchUsers(){
        let promise =   new Promise((resolve,reject)=>{
            this.af.database.list('/users')
            .subscribe(
                dbData=>{
                    resolve(dbData);
                },
                er=>{
                    reject(er);
                },
                ()=>{

                }
                
            )
        });
        return Observable.fromPromise(promise);
        
    }
    reserveParking(obj){
        let data = obj.booking;
        let slot = obj.selectSlot;
        let uid = obj.user.$key;
        let slotToUpdate = +(slot.slot.name.slice(slot.slot.name.length-1)) - 1;
        let _key = slot.location+'/slots/'+slotToUpdate;
        return  new Promise((resolve,reject)=>{
                let _details = {
                bookedBy: uid,
                parkingDate: data.date,
                parkingHrs: data.selectedhours,
                startTime: data.time
             };
            let userNode = this.af.database.list('/locations');
            userNode.update(_key,_details)
            .then(
                data=>{
                    console.log(`${data} from update user!`)
                    resolve({});
            })
            .catch(err=>reject(err));
         })
        //return Observable.fromPromise(promise);
         
    }
    removeParking(data){
        let slotToUpdate = +(data.name.slice(data.name.length-1)) - 1;
        let _key = data.location+'/slots/'+slotToUpdate;
        return  new Promise((resolve,reject)=>{
                let _details = {
                bookedBy: '',
                parkingDate: '',
                parkingHrs: '',
                startTime: ''
             };
            let userNode = this.af.database.list('/locations');
            userNode.update(_key,_details)
            .then(
                data=>{
                    console.log(`${data} from update user!`)
                    resolve({});
            })
            .catch(err=>reject(err));
         })
        //return Observable.fromPromise(promise);
         
    }
}