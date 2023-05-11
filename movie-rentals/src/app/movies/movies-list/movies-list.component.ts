import {Component, OnInit} from '@angular/core';
import {MovieService} from "../shared/movie.service";
import {Movie} from "../shared/movie.model";
import {Router} from "@angular/router";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: Array<Movie> = [];
  searchTerm = '';
  debouncedSearchTerm = '';
  modelChanged = new Subject<string>();
  moviesSearchCriterias = ['title', 'description', 'genre'];

  constructor(private movieServices: MovieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.movieServices.getMovies()
      .subscribe(movies => this.movies = movies);

    this.modelChanged.pipe(debounceTime(300)).subscribe(_ => {
      this.debouncedSearchTerm = this.searchTerm;
    })

  }

  editMovie(id: number) {
    this.router.navigate([`/movie/edit/${id}`])
  }

  deleteMovie(movie: Movie) {
    this.movieServices.delete(movie.id)
      .subscribe(_ => {
        this.movies = this.movies.filter(m => m.id !== movie.id);
      });
  }

  addNewMovie() {
    this.router.navigate([`/movies/new`])
  }


  changed(event: any) {

    this.modelChanged.next(event);
  }
}
