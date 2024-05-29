import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.css']
})
export class ViewbookingsComponent implements OnInit {
userId!:number;
receivedData:any;
bookingDetails: any[] = [];
chunkedBookingDetails: any[][] = [];

constructor(private bookingService:BookingService, private sharedService : SharedService){}

ngOnInit() {
    this.receivedData = this.sharedService.getData();
    this.userId = this.receivedData.userId;
    this.bookingService.getBookingDetails(this.userId).subscribe(
      (response) => {
        this.bookingDetails = response;
        this.chunkProducts();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
}

//logic for grouping 5 elements each in a row
private chunkProducts() {
  console.log(this.bookingDetails.length)
  const chunkSize = 4;
  for (let i = 0; i < this.bookingDetails.length; i += chunkSize) {
    this.chunkedBookingDetails.push(this.bookingDetails.slice(i, i + chunkSize));
  }
  console.log(this.chunkedBookingDetails);
}


}
