import {Component, OnInit} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";
import {Router} from "@angular/router";
import {debounceTime, Subject} from "rxjs";
import {deleteFunction} from "../../shared/utilities";
import {Dialog} from '@angular/cdk/dialog';
import {DeleteModalComponent} from "../../delete-modal/delete-modal.component";
import * as bulmaCalendar from 'bulma-calendar';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  sortDirections: {[key: string]: string | null} = {
    birthday: null,
    name: null,
    surname: null
  }
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
  ];
  filterForm: FormGroup;
  ranges = [
    { label: '< 1949', value: 'before1949' },
    { label: '1950 - 1969', value: '1950-1969' },
    { label: '1970 - 1989', value: '1970-1989' },
    { label: '1990 - 2009', value: '1990-2009' },
    { label: '> 2010', value: 'after2010' }
  ];

  constructor(private clientService: ClientService, private router: Router, private dialog: Dialog, private fb: FormBuilder) {
    const rangeControls = this.ranges.reduce((group: any, range: any) => {
      group[range.value] = this.fb.control(false);
      return group;
    }, {});

    this.filterForm = this.fb.group(rangeControls);

    this.filterForm.valueChanges.subscribe(() => {
      this.sortedClients = this.clients.filter((item) => {
        const year = Number(item.birthday.substring(0, 4));

        return this.ranges.some((range: any) => {
          const rangeControl = this.filterForm.get(range.value);
          return rangeControl && rangeControl.value && this.checkYearInRange(year, range.value);
        });
      });
    });
  }

  checkYearInRange(year: number, range: string): boolean {
    switch (range) {
      case 'before1949':
        return year <= 1949;
      case '1950-1969':
        return year >= 1950 && year <= 1969;
      case '1970-1989':
        return year >= 1970 && year <= 1989;
      case '1990-2009':
        return year >= 1990 && year <= 2009;
      case 'after2010':
        return year >= 2010;
      default:
        return false;
    }
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

  toggleSortDirection(sortMethod: () => void, sortedMethod: string) {
    if (this.sortDirections[sortedMethod] === null) {
      this.sortDirections[sortedMethod] = 'asc';
    } else if (this.sortDirections[sortedMethod] === 'asc') {
      this.sortDirections[sortedMethod] = 'desc';
    } else {
      this.sortDirections[sortedMethod] = null;
    }
    sortMethod();
  }

  sortClientsByBirthday(): void {
    this.resetSortOrder(['name', 'surname']);
    if (this.sortDirections['birthday'] === null) {
      this.sortedClients = this.clients.slice();
    } else {
      this.sortedClients = this.sortedClients.slice().sort((a, b) => {
        const dateA = new Date(a.birthday);
        const dateB = new Date(b.birthday);
        if (this.sortDirections['birthday'] === 'asc') {
          if (dateA < dateB) {
            return -1;
          } else if (dateA > dateB) {
            return 1;
          }
        } else if (this.sortDirections['birthday'] === 'desc') {
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
    this.resetSortOrder(['birthday', 'name']);
    if (this.sortDirections['surname'] === null) {
      this.sortedClients = this.clients.slice();
    } else {
      this.sortedClients = this.sortedClients.slice().sort((a, b) => {
        const surnameA = a.surname.toLowerCase();
        const surnameB = b.surname.toLowerCase();
        if (this.sortDirections['surname'] === 'asc') {
          if (surnameA < surnameB) {
            return -1;
          } else if (surnameA > surnameB) {
            return 1;
          }
        } else if (this.sortDirections['surname'] === 'desc') {
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
      this.resetSortOrder(['birthday', 'surname']);
    if (this.sortDirections['name'] === null) {
      this.sortedClients = this.clients.slice();
    } else {
      this.sortedClients = this.sortedClients.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (this.sortDirections['name'] === 'asc') {
          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          }
        } else if (this.sortDirections['name'] === 'desc') {
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

  private resetSortOrder(columnNames: String[]) {
    columnNames.forEach(element => {
      this.sortDirections[`${element}`] = null;
    });
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
