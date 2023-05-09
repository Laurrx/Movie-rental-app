import { Component } from '@angular/core';
import {Movie} from "../shared/movie.model";
import {MovieService} from "../shared/movie.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent {

  constructor(private movieService:MovieService,
              private location:Location) {

  }


  saveMovie(title: string, description: string, genre: string) {
    const movie: Movie={title,description,genre} as Movie;
    this.movieService.save(movie)
      .subscribe();

    this.location.back();
  }
}
