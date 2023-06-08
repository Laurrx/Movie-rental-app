import {Component, OnInit} from '@angular/core';
import {combineLatest} from 'rxjs';
import {Rental} from '../shared/rental.model';
import {Router} from '@angular/router';
import {RentalService} from '../shared/rental.service';
import {ClientService} from "../../clients/shared/client.service";
import {MovieService} from "../../movies/shared/movie.service";
import {Client} from "../../clients/shared/client.model";
import {Movie} from "../../movies/shared/movie.model";

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  rental: Rental = {} as Rental;
  rentals: Array<Rental> = [];
  clients: Array<Client> = [];
  movies!: Movie[];
  client: Client = {} as Client;
  getInfoSubscriber : any;

  constructor(private rentalService: RentalService,
              private router: Router,
              private clientsService: ClientService,
              private movieService: MovieService) {
  }

  ngOnInit(): void {

     //this.rentalService.getRentals().subscribe()
    const clientsSubscriber = this.clientsService.getAll()
    const moviesSubscriber = this.movieService.getMovies()

    this.getInfoSubscriber=combineLatest([this.rentalService.rentals$, clientsSubscriber, moviesSubscriber])
      .subscribe(response => {
        console.log(response);
        [this.rentals, this.clients, this.movies] = response;
        this.rentals.forEach(rental => {
          const movie = this.movies.filter(movie => movie.id === rental.moviesId);
          if (movie.length) {
            rental.movieTitle = movie[0].title;
          }
        })

        this.rentals.forEach(rental => {
          const client = this.clients.filter(client => client.id === rental.clientsId);
          if (client.length) {
            rental.clientFullname = client[0].name + " " + client[0].surname;
          }
        })
      })
    this.rentalService.setInitialRentals();
  }

  onStatusChanged(id: number, status: string) {
    this.rentalService.updateStatus(id, status)
      .subscribe();
    }

    ngOnDestroy(){
    this.getInfoSubscriber.unsubscribe();
    }
}

