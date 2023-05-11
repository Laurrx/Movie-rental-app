import {Component, OnInit} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit{
  clients:Array<Client>=[];
  searchTerm='';

  constructor(private clientService:ClientService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('clients')
this.clientService.getClients()
  .subscribe(clients =>this.clients=clients);
  }
  addNewClient() {
    this.router.navigate(['clients/new'])
  }

  editClient(id:number){
    this.router.navigate([`/client/edit/${id}`]);
  }

  deleteClient(client:Client) {

    this.clientService.delete(client.id)
      .subscribe(_=>{this.clients=this.clients.filter(c=>c.id!==client.id)})

  }
}
