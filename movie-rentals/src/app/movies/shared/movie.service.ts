import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Movie} from "./movie.model";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
private movieUrl = '/api/movies'
  constructor(private httpClient:HttpClient) { }

  getMovies():Observable<Movie[]>{
  return this.httpClient.get<Movie[]>(this.movieUrl);
}

getMovie(id:number):Observable<Movie | undefined>{
return this.getMovies().pipe(
map((arr:any[])=>arr.find(m=>m.id===id))
);
}

  update(movie: Movie):Observable<Movie> {
    const url =`${this.movieUrl}/${movie.id}`;
    return this.httpClient.put<Movie>(url,movie);
  }

  delete(id:number){
  const url = `${this.movieUrl}/${id}`;
  return this.httpClient.delete(url);
  }

  save(movie: Movie):Observable<Movie> {
    return this.httpClient.post<Movie>(this.movieUrl,movie);
  }
}
