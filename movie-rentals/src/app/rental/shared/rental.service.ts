import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Rental } from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService{
  public rentalsUrl = "http://localhost:3000/rentals";

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<Rental[]> {
    return this.httpClient.get<Rental[]>(this.rentalsUrl);
  }

  get(id: number): Observable<Rental | undefined> {
    return this.getRentals().pipe(
      map(arr => arr.find(r => r.id === id))
    )
  }

  save(rentedMovie : Rental){
    this.httpClient.post(this.rentalsUrl,rentedMovie)
      .subscribe(()=>console.log(rentedMovie));
  }

}
