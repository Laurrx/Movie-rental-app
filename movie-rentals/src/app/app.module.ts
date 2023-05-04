import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import {InMemoryDataService} from "./shared/in-memory-data.service";
import { ClientNewComponent } from './clients/client-new/client-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientNewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
