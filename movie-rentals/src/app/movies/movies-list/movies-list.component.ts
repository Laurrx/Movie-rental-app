import {Component, OnInit, ViewChild} from '@angular/core';
import {MovieService} from "../shared/movie.service";
import {Movie} from "../shared/movie.model";
import {Router} from "@angular/router";
import {debounceTime, Subject} from "rxjs";
import {deleteFunction} from "../../shared/utilities";
import {RentMovieComponent} from "../../rental/rent-movie/rent-movie.component";
import {DeleteModalComponent} from "../../delete-modal/delete-modal.component";
import {Dialog} from "@angular/cdk/dialog";

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
  selectYear = '0';
  filter = '';
  sortedMovies = [];
  titleCount = 0;
  genreCount = 0;
  releaseYearCount = 0;
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
              private router: Router,
              private dialog: Dialog) {
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
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px', data: movie
    })
    dialogRef.closed
      .subscribe(response => {
        if (response) {
          deleteFunction(this.movieServices, movie.id, this.movies)
            .subscribe((items: Array<Movie>) => {
              this.movies = items;
            });
        }
      })
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

  // onSelectedFilter(filter: string) {
  //   this.filter = (filter === 'default') ? '' : filter;
  // }

  checkBoxSelected(filter: string) {
    if (this.searchFilterCriterias.includes(filter)) {
      this.searchFilterCriterias.forEach((element: any, index: any) => {
        if (element === filter) this.searchFilterCriterias.splice(index, 1)
      })
      // this.filteredMovies=this.movies.filter(movie => {
      //   let found = false;
      //   this.searchFilterCriterias.forEach((filter:any)=>{
      //     if (movie.genre.toLowerCase() === filter.toLowerCase() || movie.releaseYear == this.selectYear) {
      //       console.log("the filter value is"+filter.value)
      //       found = true
      //     }
      //   })
      //   return found;
      // })


    } else {
      // if (this.searchFilterCriterias.length === 1 && this.searchFilterCriterias[0] === 'default') {
      //   console.log(this.searchFilterCriterias[0])
      //   this.searchFilterCriterias = this.searchFilterCriterias.splice(0, 1);
      // }
      this.searchFilterCriterias = [...this.searchFilterCriterias, filter];
    }
    if (this.searchFilterCriterias.length === 0) {
      this.filteredMovies = this.movies;
    }
    if (this.searchFilterCriterias != 0) {
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
    this.selectYear = value;
    this.filteredMovies = this.filteredMovies.filter(movie => movie.releaseYear === +value
    )
    if (value === 'default') {
      this.filteredMovies = this.movies;
    }
    console.log(value)
  }

  sortBy(value: string) {
    this.sortedMovies = [];
    switch (value) {
      case "title":
        this.titleCount++;
        if (this.titleCount === 1) {
          this.filteredMovies = this.filteredMovies.sort((a, b) => a.title > b.title ? 1 : -1)
          this.filteredMovies = this.filteredMovies.filter(movies => [...this.sortedMovies, movies])
        } else if (this.titleCount === 2) {
          this.filteredMovies = this.filteredMovies.sort((a, b) => a.title < b.title ? 1 : -1)
          this.filteredMovies = this.filteredMovies.filter(movies => [...this.sortedMovies, movies])
          this.titleCount = 0;
        }
        break;
      case "genre":
        this.genreCount++;
        if (this.genreCount === 1) {
          this.filteredMovies = this.filteredMovies.sort((a, b) => a.genre > b.genre ? 1 : -1)
          this.filteredMovies = this.filteredMovies.filter(movies => [...this.sortedMovies, movies])
        } else if (this.genreCount === 2) {
          this.filteredMovies = this.filteredMovies.sort((a, b) => a.genre < b.genre ? 1 : -1)
          this.filteredMovies = this.filteredMovies.filter(movies => [...this.sortedMovies, movies])
          this.genreCount = 0;
        }
        break;
      case "releaseYear":
        this.releaseYearCount++;
        if (this.releaseYearCount === 1) {
          this.filteredMovies = this.filteredMovies.sort((a, b) => a.releaseYear > b.releaseYear ? 1 : -1)
          this.filteredMovies = this.filteredMovies.filter(movies => [...this.sortedMovies, movies])
        } else if (this.releaseYearCount === 2) {
          this.filteredMovies = this.filteredMovies.sort((a, b) => a.releaseYear < b.releaseYear ? 1 : -1)
          this.filteredMovies = this.filteredMovies.filter(movies => [...this.sortedMovies, movies])
          this.releaseYearCount = 0;
        }
        break;

    }
  }
}
