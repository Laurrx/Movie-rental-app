import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Client} from '../shared/client.model';
import {Rental} from "../../rental/shared/rental.model";
import {RentalService} from "../../rental/shared/rental.service";
import {MovieService} from "../../movies/shared/movie.service";
import {forkJoin} from "rxjs";
import {Movie} from "../../movies/shared/movie.model";

@Component({
  selector: 'app-client-rentals',
  templateUrl: './client-rentals.component.html',
  styleUrls: ['./client-rentals.component.css']
})
export class ClientRentalsComponent implements OnInit {
  @Input() client?: Client;
  rentals!: Rental[];
  movies!: Movie[];
  clients!: Client[];
  rentedMovies: any = [];

  constructor(private rentalService: RentalService,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    const rentalsSubscriber = this.rentalService.getRentals();
    const moviesSubscriber = this.movieService.getMovies();

    forkJoin([rentalsSubscriber, moviesSubscriber])
      .subscribe(response => {
        [this.rentals, this.movies] = response;
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes['client'].currentValue) {
      this.rentedMovies = this.rentals.filter(rental =>
        rental.clientsId === changes['client'].currentValue.id).map(rental => {
        let rentedMovie = this.movies.filter(movie => movie.id === rental.moviesId)
        return {name: rentedMovie[0].title}
      })
    }
  }

}
