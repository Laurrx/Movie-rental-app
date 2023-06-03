import {Component, OnInit} from '@angular/core';
import {ClientService} from "../shared/client.service";
import {Client} from "../shared/client.model";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {
  newClientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    accessType: ['', [Validators.required]]
  })

  constructor(private clientService: ClientService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.newClientForm);
  }

  onSubmit() {
    const client: Client =
      {
        name: this.newClientForm.controls.name.value,
        surname: this.newClientForm.controls.surname.value,
        email: this.newClientForm.controls.email.value,
        password: this.newClientForm.controls.password.value,
        accessType: this.newClientForm.controls.accessType.value
      } as Client
    this.clientService.save(client)
      .subscribe();
    this.router.navigateByUrl('clients');
  }

  protected readonly Validators = Validators;

  cancel() {
    this.router.navigateByUrl('clients');
  }

}
