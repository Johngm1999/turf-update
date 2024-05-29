import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http : HttpClient){}

  // verifySlotFree(slotData:any): Observable<any> {
  //   console.log(slotData)
  //   return this.http.post(`http://localhost:8890/users/verifyslot`, slotData);
  // }

  slotBook(bookingData:any): Observable<any> {
    return this.http.post(`http://localhost:8890/users/bookslot`, bookingData);
  }

  getBookingDetails(userId:number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8890/users/getbookingdetails/${userId}`);
  }

  payment(paymentData:any):Observable<any> {
    return this.http.post(`http://localhost:8890/users/payment`, paymentData);
  }
}
