import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map, Subject, tap} from 'rxjs';
import {Rental} from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  public rentalsUrl = "http://localhost:3000/rentals";

  private rentals: Array<Rental> = [];
  private subject = new Subject<any>();
  public rentals$ = this.subject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  getRentals(): Observable<Rental[]> {
    return this.httpClient.get<Rental[]>(this.rentalsUrl)
      .pipe(
        tap(response => {
          this.subject.next(response)
          this.rentals = response;
        })
      )
  }

  setInitialRentals() {
    this.subject.next(this.rentals)
  }

  getRentalClients(clientId: number): Observable<Rental[]> {
    const url = `${this.rentalsUrl}?clientsId=${clientId}&_expand=movies`;
    return this.httpClient.get<Rental[]>(url);
  }

  get(id: number): Observable<Rental | undefined> {
    return this.getRentals().pipe(
      map(arr => arr.find(r => r.id === id))
    )
  }

  save(rentedMovie: Rental): Observable<Rental> {
    return this.httpClient.post<Rental>(this.rentalsUrl, rentedMovie)
      .pipe(
        tap(response => {
          this.rentals=[...this.rentals, response]
          this.subject.next(this.rentals);

        })
      );
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
    const url = `${this.rentalsUrl}/${id}`;
    return this.httpClient.patch(url, {"status": status})
      .pipe(
        tap(()=>{
          this.rentals=this.rentals.map(rental=>{
            if(rental.id===id){
              rental.status=status;
            }
            return rental;
          })
          this.subject.next(this.rentals);
        })
      );
  }
}
