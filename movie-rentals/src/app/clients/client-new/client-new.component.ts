import {Component, OnInit} from '@angular/core';
import {ClientService} from "../shared/client.service";
import {Location} from "@angular/common";
import {Client} from "../shared/client.model";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(private clientService: ClientService,
              private location: Location,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const client: Client =
      {
        name: this.form.controls.name.value,
        surname: this.form.controls.surname.value
      } as Client
    this.clientService.save(client)
      .subscribe();

    this.location.back();
  }

}
