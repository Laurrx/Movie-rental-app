import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClientsComponent} from './clients/clients.component';
import {ClientsListComponent} from './clients/clients-list/clients-list.component';
import {ClientNewComponent} from './clients/client-new/client-new.component';
import {ClientEditComponent} from './clients/client-edit/client-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MoviesComponent} from './movies/movies.component';
import {MoviesListComponent} from './movies/movies-list/movies-list.component';
import {MovieDetailComponent} from './movies/movie-detail/movie-detail.component';
import {MovieNewComponent} from './movies/movie-new/movie-new.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {MyCustomSearchPipe} from "./movies/shared/my-custom-search.pipe";
import { RentalComponent } from './rental/rental.component';
import { RentalListComponent } from './rental/rental-list/rental-list.component';
import { ApiService } from './shared/api.service';
import { RentMovieComponent } from './rental/rent-movie/rent-movie.component';
import { ClientRentalsComponent } from './clients/client-rentals/client-rentals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientNewComponent,
    ClientEditComponent,
    MoviesComponent,
    MoviesListComponent,
    MovieDetailComponent,
    MovieNewComponent,
    MyCustomSearchPipe,
    RentalComponent,
    RentalListComponent,
    RentMovieComponent,
    ClientRentalsComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
