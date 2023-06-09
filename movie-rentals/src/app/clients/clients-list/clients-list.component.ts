import {Component, OnInit} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";
import {Router} from "@angular/router";
import {debounceTime, Subject} from "rxjs";
import {deleteFunction} from "../../shared/utilities";
import {Dialog} from '@angular/cdk/dialog';
import {DeleteModalComponent} from "../../delete-modal/delete-modal.component";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  clients: Array<Client> = [];
  searchTerm = '';
  clientsSearchCriterias = ['name', 'surname'];
  debouncedSearchTerm = '';
  modelChanged = new Subject<string>();
  selectedClient!: Client;
  isLoading = false;
  filter = '';
  filterType = 'type';
  value = [{
    display: 'Select Filter',
    value: 'default'
  }, {
    display: 'Standard',
    value: 'standard'
  }, {
    display: 'Premium',
    value: 'premium'
  }]

  constructor(private clientService: ClientService,
              private router: Router,
              private dialog: Dialog) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.clientService.getAll()
      .subscribe(clients => {
        this.clients = clients
        this.isLoading = false;
      });

    this.modelChanged.pipe(debounceTime(300)).subscribe(_ => {
      this.debouncedSearchTerm = this.searchTerm;
    })

  }

  addNewClient() {
    this.router.navigate(['clients/new'])
  }

  editClient(id: number) {
    this.router.navigate([`/client/edit/${id}`]);
  }

  deleteClient(client: Client) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px', data: client
    })
    dialogRef.closed
      .subscribe(response => {
        if (response) {
          deleteFunction(this.clientService, client.id, this.clients)
            .subscribe((items: Array<Client>) => this.clients = items);
        }
      })


  }

  itChanged = false;

  changed(event: any) {
    this.modelChanged.next(event);
  }


  showClient(client: Client) {
    this.selectedClient = client;
  }

  onSelectedFilter(filter: any) {
    this.filter = (filter === 'default') ? '' : filter;
  }

}
