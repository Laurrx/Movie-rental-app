import {Injectable} from '@angular/core';
import {ApiService} from "../../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ApiService {
  public override url = "http://localhost:3000/clients";
}




