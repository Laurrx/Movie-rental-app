import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "./client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientUrl='api/clients';
  constructor(private httpClient: HttpClient) { }

  getClients():Observable<Client[]>{
    return this.httpClient.get<Client[]>(this.clientUrl);
  }

}




