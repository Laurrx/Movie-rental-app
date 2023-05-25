import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientService} from "../../clients/shared/client.service";
import {DatePipe} from "@angular/common";
import {Movie} from "../../movies/shared/movie.model";
import {MovieService} from "../../movies/shared/movie.service";
import {Rental} from "../shared/rental.model";
import {RentalService} from "../shared/rental.service";
import {Client} from "../../clients/shared/client.model";

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
  selectedClient = '';
  clients: Array<Client> = [];
  client: Client = {} as Client;
  @Input() movie: Movie = {} as Movie;
  @Output() newRentEvent = new EventEmitter<any>();
  onClick: any;
  clientId = '';

  constructor(private clientsService: ClientService,
              private movieService: MovieService,
              private rentalService: RentalService) {
  }

  ngOnInit(): void {
    this.onClick = true;
    this.clientsService.getAll()
      .subscribe(clients => this.clients = clients)
    // this.changeFormat(this.today)
  }

  addNewRentedMovie(startDate: string, returnDate: string) {
    const rentedMovie: Rental = {
      rentedDate: startDate,
      dueDate: returnDate,
      clientsId: +this.selectedClient,
      moviesId: this.movie.id,
    } as Rental;
    this.rentalService.save(rentedMovie)
      .subscribe();
    this.onClick = false;
    this.newRentEvent.emit(this.onClick);
  }

  cancel() {
    this.onClick = false;
    this.newRentEvent.emit(this.onClick);
  }

  protected readonly onselect = onselect;

  onSelected(value: string) {
    this.selectedClient = value;
    console.log(this.selectedClient)
  }
}
