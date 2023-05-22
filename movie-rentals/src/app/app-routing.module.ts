import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "./clients/clients.component";
import {ClientNewComponent} from "./clients/client-new/client-new.component";
import {MoviesComponent} from "./movies/movies.component";
import {ClientEditComponent} from "./clients/client-edit/client-edit.component";
import {MovieDetailComponent} from "./movies/movie-detail/movie-detail.component";
import {MovieNewComponent} from "./movies/movie-new/movie-new.component";
import { RentalComponent } from './rental/rental.component';

const routes: Routes = [
  {path:'clients',component:ClientsComponent},
  {path:'clients/new', component:ClientNewComponent},
  {path:'movies',component:MoviesComponent},
  {path:'client/edit/:id', component:ClientEditComponent},
  {path:'movie/edit/:id', component:MovieDetailComponent},
  {path:'movies/new', component:MovieNewComponent},
  {path: 'rental-list', component: RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
