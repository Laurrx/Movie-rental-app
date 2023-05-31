import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Client} from "../shared/client.model";
import {ClientService} from "../shared/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  client: Client = {} as Client;




  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.clientService.get(+id!)
      .subscribe(client => this.client = client!);
  }

  editClientForm = this.fb.group({
    name: [this.client.name, [Validators.required, Validators.minLength(3)]],
    surname: [this.client.surname, [Validators.required, Validators.minLength(3)]]
  })


  onSubmit() {
    this.clientService.update(this.client)
      .subscribe(_ => this.router.navigateByUrl('clients'))
  }

  cancel() {

  }


}
