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
  // sortedMovies: Movie[] = [];
  sortDirection: 'asc' | 'desc' | null = null;
  // sortProperty: 'releaseYear' | 'genre' | null = null;
  filterType = 'genre,releaseYear';
  selectYear = '';
  filter = '';
  sortedMovies = [];
  titleCount = 0;
  genreCount = 0;
  releaseYearCount = 0;
  releaseYears: any = [];
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
        this.movies.forEach(movie => {
          this.releaseYears = [...this.releaseYears, movie.releaseYear]

        })
        this.releaseYears = this.releaseYears.sort((a: any, b: any) => a > b ? 1 : -1)
        this.releaseYears = this.uniqByFilter(this.releaseYears);
        this.filteredMovies = this.movies;
        this.isLoading = false;
        // this.sortMoviesByReleaseYear();
        // this.sortMoviesByGenre();
        // this.sortMoviesByTitle();
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
        this.ngOnInit();
      });
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

  uniqByFilter<T>(array: T[]) {
    return array.filter((value, index) => array.indexOf(value) === index);
  }

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
    this.filteredMovies = this.movies.filter(movie => movie.releaseYear === +value
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
  
  sortMoviesByReleaseYear(): void {
    if (this.sortDirection === null) {
      this.filteredMovies = this.movies.slice();
    } else {
      this.filteredMovies = this.movies.slice().sort((a: any, b: any) => {
        if (this.sortDirection === 'asc') {
          return a.releaseYear - b.releaseYear;
        } else {
          return b.releaseYear - a.releaseYear;
        }
      });
    }
  }

  sortMoviesByGenre() {
    if (this.sortDirection === null) {
      this.filteredMovies = this.movies.slice();
    } else {
      this.filteredMovies = this.movies.slice().sort((a, b) => {
        const genreA = a.genre.toLowerCase();
        const genreB = b.genre.toLowerCase();
        if (this.sortDirection === 'asc') {
          if (genreA < genreB) {
            return -1;
          } else if (genreA > genreB) {
            return 1;
          }
        } else if (this.sortDirection === 'desc') {
          if (genreA > genreB) {
            return -1;
          } else if (genreA < genreB) {
            return 1;
          }
        }
        return 0;
      });
    }
  }

  sortMoviesByTitle() {
    if (this.sortDirection === null) {
      this.filteredMovies = this.movies.slice();
    } else {
      this.filteredMovies = this.movies.slice().sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (this.sortDirection === 'asc') {
          if (titleA < titleB) {
            return -1;
          } else if (titleA > titleB) {
            return 1;
          }
        } else if (this.sortDirection === 'desc') {
          if (titleA > titleB) {
            return -1;
          } else if (titleA < titleB) {
            return 1;
          }
        }
        return 0;
      });
    }
  }

}
