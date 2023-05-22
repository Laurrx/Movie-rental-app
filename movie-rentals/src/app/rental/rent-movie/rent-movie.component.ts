import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientService} from "../../clients/shared/client.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rent-movie',
  templateUrl: './rent-movie.component.html',
  styleUrls: ['./rent-movie.component.css']
})
export class RentMovieComponent implements OnInit {


  today = new Date();
  changedDate: string | null = "";
  pipe = new DatePipe('en-US');

  /*changeFormat(today: any) {
    let changedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.changedDate = changedFormat;
    console.log(this.changedDate);
  }*/

  clients: Array<any> = [];
  @Input() movie: any;
  @Output() newRentEvent = new EventEmitter<any>();
  onClick: any;

  constructor(private clientsService: ClientService) {
  }

  ngOnInit(): void {
    this.onClick = true;
    this.clientsService.getAll()
      .subscribe(clients => this.clients = clients)
   // this.changeFormat(this.today)
  }

  addNewRentedMovie() {
    this.onClick = false;
    this.newRentEvent.emit(this.onClick);
  }

  cancel() {
    this.onClick = false;
    this.newRentEvent.emit(this.onClick);
  }

}
