import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {


  createDb(){
    const clients=[
      {id:1,name:'john'},
      {id:2,name:'david'},
      {id:3,name:'sylvester'},
      {id:4,name:'greg'},
    ];
    return {clients};
  }
}
