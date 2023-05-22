import { Component, Input } from '@angular/core';
import { Client } from '../shared/client.model';

@Component({
  selector: 'app-client-rentals',
  templateUrl: './client-rentals.component.html',
  styleUrls: ['./client-rentals.component.css']
})
export class ClientRentalsComponent {
  @Input() client?: Client;

  constructor() {
  }

  ngOnInit(): void {
    
  }
}
