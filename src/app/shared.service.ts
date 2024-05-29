import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  setData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  setBookingData(data:any){
    localStorage.setItem('bookingData', JSON.stringify(data));
  }

  getBookingData(){
    let data = localStorage.getItem('bookingData');
    if(data !== null) {
     data = JSON.parse(data); 
    }
    return data;
  }

  getData() {
    let data = localStorage.getItem('user');
    if(data !== null) {
     data = JSON.parse(data); 
    }
    return data;
  }

}
