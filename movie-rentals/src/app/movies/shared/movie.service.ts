import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Movie } from "./movie.model";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieUrl = "http://localhost:3000/movies"
  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.movieUrl);
  }

  getMovie(id: number): Observable<Movie | undefined> {
    return this.getMovies().pipe(
      map((arr: any[]) => arr.find(m => m.id === id))
    );
  }

  update(movie: Movie): Observable<Movie> {
    const url = `${this.movieUrl}/${movie.id}`;
    return this.httpClient.put<Movie>(url, movie);
  }

  delete(id: number) {
    const url = `${this.movieUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  save(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(this.movieUrl, movie);
  }

  // sortDirection: 'asc' | 'desc' = 'asc';

  // sortMoviesByReleaseYear(movies: any, sortedMovies: any): void {
  //   sortedMovies = movies.slice();
  //   sortedMovies.sort((a: any, b: any) => {
  //     if (this.sortDirection === 'asc') {
  //       return a.releaseYear - b.releaseYear;
  //     } else {
  //       return b.releaseYear - a.releaseYear;
  //     }
  //   });
  // }

  // toggleSortDirection(): void {
  //   this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //   this.sortMoviesByReleaseYear();
  // }
}
