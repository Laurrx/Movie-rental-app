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

  deleteClient(client: Client){
    this.clientService.delete(client.id)
      .subscribe(_=>{
        this.clientService.getClients()
          .subscribe();
        this.clients = this.clients.filter(c=>c.id!== client.id);
      });
  }

}
