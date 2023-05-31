import {Component, OnInit} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";
import {Router} from "@angular/router";
import {debounceTime, Subject} from "rxjs";
import {deleteFunction} from "../../shared/utilities";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  clients: Array<Client> = [];
  searchTerm = '';
  clientsSearchCriterias = ['name','surname'];
  debouncedSearchTerm = '';
  modelChanged = new Subject<string>();

  constructor(private clientService: ClientService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.clientService.getAll()
      .subscribe(clients => this.clients = clients);

    this.modelChanged.pipe(debounceTime(300)).subscribe(_ => {
      this.debouncedSearchTerm = this.searchTerm;
    })

  }

  addNewClient() {
    this.router.navigate(['clients/new'])
  }

  editClient(id: number,client:any) {
    this.router.navigate([`/client/edit/${id}`]);
  }

  deleteClient(client: Client) {
    if (confirm("Are you sure you want to delete " + client.name + " ?"))
      deleteFunction(this.clientService, client.id, this.clients)
        .subscribe((items: Array<Client>) => this.clients = items);
  }

  changed(event: any) {

    this.modelChanged.next(event);
  }

  selectedClient!: Client;

  showClient(client: Client) {
    this.selectedClient = client;
  }

}
