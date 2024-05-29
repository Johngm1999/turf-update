import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
    paymentForm!:FormGroup;
    showSuccessMessage:boolean=false;
    showError:boolean=false;
    receivedBookingData:any;
    recievedData:any;
    userId:any;
    paymentId!:number;

    constructor(private fb: FormBuilder, private router: Router, private bookingService:BookingService, private sharedService : SharedService) { }

    ngOnInit() {
      this.recievedData = this.sharedService.getData();
      this.userId = this.recievedData.userId;
      this.paymentForm = this.fb.group({
        cardNumber: ['', Validators.required],
        month: ['', Validators.required],
        customerName: [null, Validators.required],
        securityCode: ['', Validators.required],
        userId: [this.userId],
      });

      this.receivedBookingData = this.sharedService.getBookingData();

    }

    onSubmit() {
      if (this.paymentForm.valid) {
        // Access form values using this.myForm.value
        const paymentData = this.paymentForm.value;
        this.bookingService.payment(paymentData).subscribe(
          (response:any) => {
            if(response!=null){
              this.paymentId = response.paymentId;
              console.log(this.paymentId);
              console.log(response)
              this.receivedBookingData.paymentId = this.paymentId;
              this.bookingService.slotBook(this.receivedBookingData).subscribe(
                  (response:any) => {
                  if(response){
                  this.showSuccessMessage = true;
                  setTimeout(() => {
                  this.showSuccessMessage = false;
                  this.router.navigate(['/dashboard']);
                  }, 1000);
                }
              },
          (error:any) => {
            alert('Error Booking');
            // Handle error (e.g., show an error message)
          }
        );
            }
          },
          (error:any) => {
            alert('Error Booking');
            // Handle error (e.g., show an error message)
          }
        );
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 1000);
    }
  }
}
