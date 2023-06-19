import {Component,Input} from '@angular/core';
import {Client} from "../shared/client.model";
import {Movie} from "../../movies/shared/movie.model";
import {FormBuilder, Validators} from "@angular/forms";
import {ClientService} from "../shared/client.service";
import {MovieService} from "../../movies/shared/movie.service";
import {RentalService} from "../../rental/shared/rental.service";
import {Rental} from "../../rental/shared/rental.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-client-rent-movie',
  templateUrl: './client-rent-movie.component.html',
  styleUrls: ['./client-rent-movie.component.css']
})
export class ClientRentMovieComponent {
  clients: Array<Client> = [];
  client: Client = {} as Client;
  @Input() movie: Movie = {} as Movie;
  onClick: any;
  minDate = '';
  maxDate=new Date();
  today = new Date();
  selectedDate = new Date();
  isRented = false;

  rentMovieForm = this.fb.group({
    rentedDate: ['', [Validators.required]],
    dueDate: ['', [Validators.required]]
  });

  constructor(private clientsService: ClientService,
              private movieService: MovieService,
              private rentalService: RentalService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isRented = false;
    this.onClick = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.clientsService.get(+id!)
      .subscribe(client => {
        this.client = client!
      })
    this.clientsService.getAll()
      .subscribe(clients => this.clients = clients)
    this.minDate = this.today.toISOString().split('T')[0];
  }





  onSubmit() {
    this.isRented=true;
    const rentedMovie: Rental = {
      rentedDate: this.rentMovieForm.controls.rentedDate.value,
      dueDate: this.rentMovieForm.controls.dueDate.value,
      clientsId: this.client.id,
      moviesId: this.movie.id,
      status: "active"
    } as Rental;
    this.rentalService.save(rentedMovie)
      .subscribe();

  }

  selectDate(rentedDate: any) {
    this.selectedDate = rentedDate;
    this.rentMovieForm.controls.dueDate.setValue('');
  }

  cancel() {
  }
}
