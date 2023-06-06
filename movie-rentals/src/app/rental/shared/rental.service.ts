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

  getRentalClients(clientId:number): Observable<Rental[]>{
    const url = `${this.rentalsUrl}?clientsId=${clientId}&_expand=movies`;
    return this.httpClient.get<Rental[]>(url);
  }

  get(id: number): Observable<Rental | undefined> {
    return this.getRentals().pipe(
      map(arr => arr.find(r => r.id === id))
    )
  }

  save(rentedMovie : Rental) :Observable<Rental>{
    return this.httpClient.post<Rental>(this.rentalsUrl,rentedMovie);
  }

  delete(id: number) {
    const url = `${this.rentalsUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  // update(rental: Rental):Observable<Rental> {
  //   const url =`${this.rentalsUrl}/${rental.id}`;
  //   return this.httpClient.put<Rental>(url,rental);
  // }

  updateStatus(id: number, status: string): Observable<any> {
    const url =`${this.rentalsUrl}/${id}`;
    return this.httpClient.patch(url, {"status": status});
  }
}
