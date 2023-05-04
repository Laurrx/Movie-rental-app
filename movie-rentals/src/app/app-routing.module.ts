import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "./clients/clients.component";
import {ClientEditComponent} from "./clients/client-edit/client-edit.component";

const routes: Routes = [
  {path:'clients',component:ClientsComponent},
  {path:'client/edit/:id', component:ClientEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
