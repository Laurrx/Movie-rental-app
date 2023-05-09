import {Component, OnInit} from '@angular/core';
import {Movie} from "../shared/movie.model";
import {ActivatedRoute} from "@angular/router";
import {MovieService} from "../shared/movie.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit{
  movie:Movie={} as Movie;

  constructor(private activatedRoute:ActivatedRoute,
              private movieService:MovieService,
              private location:Location) {
  }

  ngOnInit(): void {
  const id=this.activatedRoute.snapshot.paramMap.get('id');
  this.movieService.getMovie(+id!)
    .subscribe(movie =>this.movie=movie!);
  }

  updateMovie() {
  this.movieService.update(this.movie)
    .subscribe();
this.location.back();
  }
}
