import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
  rentals!: Rental[];
  clients: Array<Client> = [];
  movies!: Movie[];
  rentalClients!: Rental[];
  client: Client = {} as Client;

  constructor(private rentalService: RentalService,
              private router: Router,
              private clientsService: ClientService,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.rentalService.getRentals()
      .subscribe((data: any) => {
        this.rentals = data;
        /*return this.rentals.forEach(item => {
          this.client = {id: item.clientsId, name: item.clientFullname,} as Client;
          console.log(this.client)
        })*/

      });

    /*this.rentalService.getRentalClients(this.client.id)
      .subscribe(rental => {
        this.rentalClients = rental;
        console.log(this.rentalClients);
      })*/

  }


}

