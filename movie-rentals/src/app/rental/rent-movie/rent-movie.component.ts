import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientService} from "../../clients/shared/client.service";
import {Movie} from "../../movies/shared/movie.model";
import {MovieService} from "../../movies/shared/movie.service";
import {Rental} from "../shared/rental.model";
import {RentalService} from "../shared/rental.service";
import {Client} from "../../clients/shared/client.model";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rent-movie',
  templateUrl: './rent-movie.component.html',
  styleUrls: ['./rent-movie.component.css']
})
export class RentMovieComponent implements OnInit {
  clients: Array<Client> = [];
  client: Client = {} as Client;
  @Input() movie: Movie = {} as Movie;
  @Output() newRentEvent = new EventEmitter<any>();
  onClick: any;
  minDate='';
  today = new Date();
  selectedDate = new Date();

  rentMovieForm = this.fb.group({
    clientsId: [0, [Validators.min(1)]],
    rentedDate: ['', [Validators.required]],
    dueDate: ['', [Validators.required]]
  });

  constructor(private clientsService: ClientService,
              private movieService: MovieService,
              private rentalService: RentalService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.onClick = true;
    this.clientsService.getAll()
      .subscribe(clients => this.clients = clients)
    this.minDate=this.today.toISOString().split('T')[0];
  }


  cancel() {
    this.onClick = false;
    this.newRentEvent.emit(this.onClick);
  }


  onSelected(value: string) {
    this.rentMovieForm.controls.clientsId.setValue(+value)
    console.log(this.rentMovieForm.controls.clientsId.value)
  }

  onSubmit() {
    const rentedMovie: Rental = {
          rentedDate: this.rentMovieForm.controls.rentedDate.value,
          dueDate: this.rentMovieForm.controls.dueDate.value,
          clientsId: this.rentMovieForm.controls.clientsId.value,
          moviesId: this.movie.id,
          status: "active"
        } as Rental;
    this.rentalService.save(rentedMovie)
      .subscribe();
    this.newRentEvent.emit(false);
    console.log(this.rentMovieForm.controls);
  }

  selectDate(date:any) {
    this.selectedDate=date;
  }
}
