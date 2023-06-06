import {Component, OnInit} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {RentalService} from "../../rental/shared/rental.service";
import {MovieService} from "../../movies/shared/movie.service";
import {forkJoin} from "rxjs";
import {Rental} from "../../rental/shared/rental.model";
import {Movie} from "../../movies/shared/movie.model";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  client: Client = {} as Client;
  rentals!:Rental[];
  movies!:Movie[];
  rentedMovies:any=[];
  name: string = '';
  isLoading = false;

  editClientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private rentalService:RentalService,
              private movieService:MovieService) {
  }


  ngOnInit(): void {
    this.isLoading = true;
    const rentalsSubscriber = this.rentalService.getRentals();
    const moviesSubscriber = this.movieService.getMovies();
    forkJoin([rentalsSubscriber, moviesSubscriber])
      .subscribe(response => {
        [this.rentals, this.movies] = response;
      })
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.clientService.get(+id!)
      .subscribe(client => {
        this.client = client!
        this.editClientForm.controls.name.setValue(this.client.name)
        this.editClientForm.controls.surname.setValue(this.client.surname)

        this.rentedMovies = this.rentals.filter(rental =>
          rental.clientsId === this.client.id)
          .map(rental => {
            let rentedMovie = this.movies.filter(movie => movie.id === rental.moviesId)
            return {name: rentedMovie[0].title, rentedDate: rental.rentedDate, dueDate: rental.dueDate,}

          })

        this.isLoading = false;
      });
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    //in cazul in care este
    this.clientService.update({...this.client, ...this.editClientForm.value})
      .subscribe(_ => {
        this.router.navigateByUrl('clients')
        this.isLoading = false;
      })
  }

  cancel() {
    this.router.navigateByUrl('clients')
  }
}
