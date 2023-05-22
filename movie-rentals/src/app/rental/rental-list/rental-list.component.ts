import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../shared/rental.model';
import { Router } from '@angular/router';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit{
  rentals!: Rental[];

  constructor(private rentalService: RentalService, private router: Router) {}

  ngOnInit(): void {
    this.rentalService.getRentals().subscribe((data: any) => {
      this.rentals = data;
    });
  }
}
