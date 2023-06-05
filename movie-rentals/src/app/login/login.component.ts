import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Client} from "../clients/shared/client.model";
import {ClientService} from "../clients/shared/client.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
constructor(private fb:FormBuilder,
            private clientService:ClientService) {
}

client: Array<Client> =[];

  ngOnInit(): void {
    this.clientService.getAll()
      .subscribe(client => this.client=client)
    }

loginForm=this.fb.group({
  email:[''],
  password:['']
})

  onSubmit() {
     this.client.filter(client => {client.email===this.loginForm.controls.email.value
       if(this.loginForm.controls.password.value===client.password){
         console.log("succes:" + client.name)
       }})

  }
}
