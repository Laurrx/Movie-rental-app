import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
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

  save(client: Client):Observable<Client> {

    return this.httpClient.post<Client>(this.clientUrl,client);
  }
  getClient(id:number):Observable<Client | undefined>{
    return this.getClients().pipe(
      map((arr: any[])=>arr.find(c=>c.id===id)));

  }

  update(client: Client):Observable<Client> {
    const url= `${this.clientUrl}/${client.id}`;
    return this.httpClient.put<Client>(url,client);
  }
}




