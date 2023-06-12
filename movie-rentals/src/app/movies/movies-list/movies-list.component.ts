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
  // sortedMovies: Movie[] = [];
  sortDirection: 'asc' | 'desc' | null = null;
  sortProperty: 'releaseYear' | 'genre' | null = null;
  filterType = 'genre,releaseYear';
  selectYear = 0;
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
        this.sortMoviesByReleaseYear();
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
      console.log("the searchFilterCriterias are "+this.searchFilterCriterias + "and length is "+this.searchFilterCriterias.length
                  +"and the filteredMovies are "+this.filteredMovies)


    } else {
      // if (this.searchFilterCriterias.length === 1 && this.searchFilterCriterias[0] === 'default') {
      //   console.log(this.searchFilterCriterias[0])
      //   this.searchFilterCriterias = this.searchFilterCriterias.splice(0, 1);
      // }
      this.searchFilterCriterias = [...this.searchFilterCriterias, filter];
    }
    if (this.searchFilterCriterias.length === 0) {
      this.filteredMovies=this.movies;
      console.log("filtered movies are "+this.filteredMovies+"and movies are "+this.movies)
    }
    if(this.searchFilterCriterias!=0){
      this.filteredMovies = this.movies.filter(movie => {
        let found = false;
        this.searchFilterCriterias.forEach((filter: any) => {
          if (movie.genre.toLowerCase() === filter.toLowerCase() || movie.releaseYear===this.selectYear) {
            found = true
          }
        })
        return found;
      })
    }



  }

  selectedYear(value: string) {
    this.selectYear= +value;
    console.log(value)
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

  toggleSortDirection(): void {
    if (this.sortDirection === null) {
      this.sortDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = null;
    }
    this.sortMoviesByReleaseYear();
  }
}
