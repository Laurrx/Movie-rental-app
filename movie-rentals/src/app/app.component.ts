import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {RentalService} from "./rental/shared/rental.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'movie-rentals';

  constructor(private router: Router,
              private rentalService:RentalService) {};

  signUp() {
    this.router.navigate(['clients/new']);
  }

  ngOnInit(): void {
    this.rentalService.getRentals()
      .subscribe();
  }
}
