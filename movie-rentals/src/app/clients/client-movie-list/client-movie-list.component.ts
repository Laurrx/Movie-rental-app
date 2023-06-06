import {Component, OnInit} from '@angular/core';
import {debounceTime, Subject} from "rxjs";
import {Movie} from "../../movies/shared/movie.model";
import {MovieService} from "../../movies/shared/movie.service";

@Component({
  selector: 'app-client-movie-list',
  templateUrl: './client-movie-list.component.html',
  styleUrls: ['./client-movie-list.component.css']
})
export class ClientMovieListComponent implements OnInit {
  movies: Array<Movie> = [];
  searchTerm = '';
  debouncedSearchTerm = '';
  modelChanged = new Subject<string>();
  moviesSearchCriterias = ['title', 'description', 'genre'];
  isLoading = false;
  selectedMovie?: any;
  isSelectedMovie = false;

  constructor(private movieServices: MovieService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.movieServices.getMovies()
      .subscribe(movies => {
        this.movies = movies
        this.isLoading = false;
      });

    this.modelChanged.pipe(debounceTime(300)).subscribe(_ => {
      this.debouncedSearchTerm = this.searchTerm;
    })

  }


  changed(event: any) {

    this.modelChanged.next(event);
  }

  onSelectedMovie(movie: any) {
    this.selectedMovie = movie;
    this.isSelectedMovie = true;
  }

  newRent($event: any) {
    this.isSelectedMovie = $event;
  }

}
