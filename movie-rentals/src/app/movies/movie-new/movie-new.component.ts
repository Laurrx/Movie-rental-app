import {Component} from '@angular/core';
import {Movie} from "../shared/movie.model";
import {MovieService} from "../shared/movie.service";
import {Location} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-movie-new',
  templateUrl: './movie-new.component.html',
  styleUrls: ['./movie-new.component.css']
})
export class MovieNewComponent {

  constructor(private movieService: MovieService,
              private location: Location,
              private fb: FormBuilder) {

  }

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.maxLength(200)]],
    genre: ['', [Validators.required, Validators.minLength(4)]],
    releaseYear: [0, [Validators.required, Validators.minLength(4)]]
  })

  onSubmit() {
    const movie: Movie = {
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      genre: this.form.controls.genre.value,
      releaseYear: this.form.controls.releaseYear.value
    } as Movie;

    this.movieService.save(movie)
      .subscribe();
    this.location.back();
  }
}
