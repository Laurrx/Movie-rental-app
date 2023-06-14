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
  sortDirection: 'asc' | 'desc' | null = null;
  sortedClients = this.clients;
  isLoading = false;
  filter = '';
  filterType = 'type';
  searchFilterCriterias: any = [];
  value = [
    {
      display: 'Standard',
      value: 'standard'
    }, {
      display: 'Premium',
      value: 'premium'
    }
  ]

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
        this.sortedClients = this.clients;
        this.sortClientsByBirthday();
        this.sortClientsBySurname();
        this.sortClientsByName();
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

  toggleSortDirection(sortMethod: () => void) {
    if (this.sortDirection === null) {
      this.sortDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = null;
    }
    sortMethod();
  }

  sortClientsByBirthday(): void {
    if (this.sortDirection === null) {
      this.sortedClients = this.clients.slice();
    } else {
      this.sortedClients = this.clients.slice().sort((a, b) => {
        const dateA = new Date(a.birthday);
        const dateB = new Date(b.birthday)
        if (this.sortDirection === 'asc') {
          if (dateA < dateB) {
            return -1;
          } else if (dateA > dateB) {
            return 1;
          }
        } else if (this.sortDirection === 'desc') {
          if (dateA > dateB) {
            return -1;
          } else if (dateA < dateB) {
            return 1;
          }
        }
        return 0;
      });
    }
  }

  sortClientsBySurname() {
    if (this.sortDirection === null) {
      this.sortedClients = this.clients.slice();
    } else {
      this.sortedClients = this.clients.slice().sort((a, b) => {
        const surnameA = a.surname.toLowerCase();
        const surnameB = b.surname.toLowerCase();
        if (this.sortDirection === 'asc') {
          if (surnameA < surnameB) {
            return -1;
          } else if (surnameA > surnameB) {
            return 1;
          }
        } else if (this.sortDirection === 'desc') {
          if (surnameA > surnameB) {
            return -1;
          } else if (surnameA < surnameB) {
            return 1;
          }
        }
        return 0;
      });
    }
  }

  sortClientsByName() {
    if (this.sortDirection === null) {
      this.sortedClients = this.clients.slice();
    } else {
      this.sortedClients = this.clients.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (this.sortDirection === 'asc') {
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          }
        } else if (this.sortDirection === 'desc') {
          if (nameA > nameB) {
            return -1;
          } else if (nameA < nameB) {
            return 1;
          }
        }
        return 0;
      });
    }
  }

  checkBoxSelected(filter: string) {
    if (this.searchFilterCriterias.includes(filter)) {
      this.searchFilterCriterias.forEach((element: any, index: any) => {
        if (element === filter) this.searchFilterCriterias.splice(index, 1)
      })
    } else {
      this.searchFilterCriterias = [...this.searchFilterCriterias, filter];
    }
    if (this.searchFilterCriterias.length === 0) {
      this.sortedClients = this.clients;
    }
    if (this.searchFilterCriterias != 0) {
      this.sortedClients = this.clients.filter(clients => {
        let found = false;
        this.searchFilterCriterias.forEach((filter: any) => {
          if (clients.type.toLowerCase() === filter.toLowerCase()) {
            found = true
          }
        })
        return found;
      })
    }
  }

}
