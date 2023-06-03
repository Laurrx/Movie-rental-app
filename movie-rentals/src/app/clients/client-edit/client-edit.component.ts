import {Component, OnInit} from '@angular/core';
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
  name: string = '';
  isLoading = false;

  editClientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.clientService.get(+id!)
      .subscribe(client => {
        this.client = client!
        this.editClientForm.controls.name.setValue(this.client.name)
        this.editClientForm.controls.surname.setValue(this.client.surname)
        this.isLoading = false;
      });
  }


  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    //in cazul in care este
    this.clientService.update({...this.client, ...this.editClientForm.value})
      .subscribe(_ => {
        this.router.navigateByUrl('clients')
        this.isLoading = false;
      })
  }

  cancel() {
    this.router.navigateByUrl('clients')
  }
}
