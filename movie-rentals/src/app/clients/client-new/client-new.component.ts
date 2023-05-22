import {Component, OnInit} from '@angular/core';
import {ClientService} from "../shared/client.service";
import {Location} from "@angular/common";
import {Client} from "../shared/client.model";

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit{

  constructor(private clientService :ClientService,
              private location: Location) {
  }


  saveClient(name:string, surname: string) {
    const client: Client={name, surname} as Client;

    this.clientService.save(client)
      .subscribe();

      this.location.back();
  }

  ngOnInit(): void {
  }
}
