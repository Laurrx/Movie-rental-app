import {Component, OnInit} from '@angular/core';
import {MovieService} from "../shared/movie.service";
import {Movie} from "../shared/movie.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit{
  movies:Array<Movie>=[];
  searchTerm='';
  constructor(private movieServices:MovieService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.movieServices.getMovies()
      .subscribe(movies=>this.movies=movies);
  }

  editMovie(id:number) {
    this.router.navigate([`/movie/edit/${id}`])
  }

  deleteMovie(movie: Movie) {
    this.movieServices.delete(movie.id)
      .subscribe(_=>{
        this.movies=this.movies.filter(m=>m.id!==movie.id);
      });
  }

  addNewMovie() {
    this.router.navigate([`/movies/new`])
  }



}
