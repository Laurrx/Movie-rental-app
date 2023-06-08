import {Component, Input, OnInit} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {RentalService} from "../../rental/shared/rental.service";
import {MovieService} from "../../movies/shared/movie.service";
import {combineLatest, forkJoin} from "rxjs";
import {Rental} from "../../rental/shared/rental.model";
import {Movie} from "../../movies/shared/movie.model";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  client: Client = {} as Client;
  rentals!: Rental[];
  movies!: Movie[];
  rentedMovies: any = [];
  name: string = '';
  isLoading = false;
  getInfoSubscriber : any;

  editClientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private rentalService: RentalService,
              private movieService: MovieService) {
  }


  ngOnInit(): void {
    this.isLoading = true;
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    // this.rentalService.getRentals()
    //   .subscribe()

    const moviesSubscriber = this.movieService.getMovies();
    this.getInfoSubscriber = combineLatest([ this.rentalService.rentals$, moviesSubscriber])
      .subscribe((response:any)=> {
        [this.rentals, this.movies] = response;
        this.rentedMovies = this.rentals.filter(rental =>
          rental.clientsId === id && rental.status === 'active')
          .map(rental => {
            let rentedMovie = this.movies.filter(movie => movie.id === rental.moviesId)
            return {id: rental.id, name: rentedMovie[0].title, rentedDate: rental.rentedDate, dueDate: rental.dueDate,}

          })

      })
    this.clientService.get(+id!)
      .subscribe(client => {
        this.client = client!
        this.editClientForm.controls.name.setValue(this.client.name)
        this.editClientForm.controls.surname.setValue(this.client.surname)


        this.isLoading = false;
      });
    this.rentalService.setInitialRentals();
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.clientService.update({...this.client, ...this.editClientForm.value})
      .subscribe(_ => {
        this.router.navigateByUrl('clients')
        this.isLoading = false;
      })
  }

  cancel() {
    this.router.navigateByUrl('clients')
  }

  onStatusUpdate(id: number, status: string) {
    this.rentalService.updateStatus(id, status)
      .subscribe();
  }

  ngOnDestroy() {
    this.getInfoSubscriber.unsubscribe();
}
}
