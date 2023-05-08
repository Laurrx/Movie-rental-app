import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

}
