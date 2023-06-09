import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from "../shared/movie.service";
import {Movie} from "../shared/movie.model";
import {Router} from "@angular/router";
import {debounceTime, Subject} from "rxjs";
import {deleteFunction} from "../../shared/utilities";
import {RentMovieComponent} from "../../rental/rent-movie/rent-movie.component";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: Array<Movie> = [];
  searchTerm = '';
  filteredMovies = this.movies;
  debouncedSearchTerm = '';
  modelChanged = new Subject<string>();
  moviesSearchCriterias = ['title', 'description'];
  searchFilterCriterias: any = [];
  isLoading = false;
  selectedMovie?: any;
  isSelectedMovie = false;
  filterType = 'genre,releaseYear'
  selectYear=0;
  filter = '';
  value = [
    {
      value: 'Science Fiction',
      display: 'Science Fiction'
    },
    {
      value: 'comedy',
      display: 'Comedy'
    },
    {
      value: 'action',
      display: 'Action'
    },
    {
      value: 'horror',
      display: 'Horror'
    },
    {
      value: 'thriller',
      display: 'Thriller'
    }
  ]

  @ViewChild(RentMovieComponent)
  rentMovieComponent!: RentMovieComponent;

  constructor(private movieServices: MovieService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.isLoading = true;
    this.movieServices.getMovies()
      .subscribe(movies => {
        this.movies = movies
        this.filteredMovies = this.movies;
        this.isLoading = false;
      });

    this.modelChanged.pipe(debounceTime(300)).subscribe(_ => {
      this.debouncedSearchTerm = this.searchTerm;
    })

  }

  editMovie(id: number) {
    this.router.navigate([`/movie/edit/${id}`])
  }

  deleteMovie(movie: Movie) {
    if (window.confirm("Are you sure you want to delete " + movie.title + "?")) {
      deleteFunction(this.movieServices, movie.id, this.movies)
        .subscribe((items: Array<Movie>) => {
          this.movies = items;
        });
    }
  }

  addNewMovie() {
    this.router.navigate([`/movies/new`])
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

  onSelectedFilter(filter: string) {
    this.filter = (filter === 'default') ? '' : filter;
  }

  empyArray(array: any) {
    array.splice(0, 1);
    return array;
  }


  checkBoxSelected(filter: string) {
    if (this.searchFilterCriterias.includes(filter)) {
      this.searchFilterCriterias.forEach((element: any, index: any) => {
        if (element === filter) this.searchFilterCriterias.splice(index, 1)
      })
      this.filteredMovies=this.movies.filter(movie => {
        let found = false;
        this.searchFilterCriterias.forEach((filter:any)=>{
          if (movie.genre.toLowerCase() === filter.toLowerCase() || movie.releaseYear == this.selectYear) {
            console.log(filter.value)
            found = true
          }
        })
        return found;
      })
      console.log(this.searchFilterCriterias)
      if (this.searchFilterCriterias.length === 0) {
        this.filteredMovies = this.movies
      }

    } else {
      if (this.searchFilterCriterias.length === 1 && this.searchFilterCriterias[0] === 'default') {
        console.log(this.searchFilterCriterias[0])
        this.searchFilterCriterias = this.searchFilterCriterias.splice(0, 1);
        // this.empyArray(this.searchFilterCriterias);
      }
      this.searchFilterCriterias = [...this.searchFilterCriterias, filter];
      console.log(this.searchFilterCriterias)
      this.filteredMovies = this.movies.filter(movie => {
        let found = false;
        this.searchFilterCriterias.forEach((filter: any) => {
          if (movie.genre.toLowerCase() === filter.toLowerCase()) {
            found = true
          }
        })
        return found;
      })

    }
  }

  selectedYear(value: string) {
    this.selectYear=+value;
    console.log(value)
    this.filteredMovies = this.movies.filter(movie => {
      let found = false;
        if (movie.releaseYear == +value) {
          found = true
        }

      return found;
    })
  }
}
