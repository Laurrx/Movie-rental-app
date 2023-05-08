import {Component, OnInit} from '@angular/core';
import {MovieService} from "../shared/movie.service";
import {Movie} from "../shared/movie.model";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit{
  movies:Array<Movie>=[];
  constructor(private movieServices:MovieService) {
  }
  ngOnInit(): void {
    this.movieServices.getMovies()
      .subscribe(movies=>this.movies=movies);
  }

}
