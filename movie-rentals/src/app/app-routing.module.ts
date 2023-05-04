import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "./clients/clients.component";
import {ClientNewComponent} from "./clients/client-new/client-new.component";

const routes: Routes = [
  {path:'clients',component:ClientsComponent},
  {path:'clients/new', component:ClientNewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
