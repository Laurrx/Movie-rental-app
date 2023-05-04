import {Component, OnInit} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit{
  clients:Array<Client>=[];

  constructor(private clientService:ClientService) {
  }

  ngOnInit(): void {
    console.log('clients')
this.clientService.getClients()
  .subscribe(clients =>this.clients=clients);
  }
}
