import {Component, OnInit} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit{

client:Client={} as Client;

  constructor(private clientService:ClientService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    const id= this.activatedRoute.snapshot.paramMap.get('id');
    this.clientService.getClient(+id!)
      .subscribe(client=>this.client= client!);
  }

  updateClient() {
    this.clientService.update(this.client)
      .subscribe(_=>this.location.back())
  }
}
