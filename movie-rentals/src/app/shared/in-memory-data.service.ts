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

    const movies=[
      {id:1,title:'Agent 007',description:'Movie with agents',genre:'Action'},
      {id:2,title:'Ice Age', description:'Movie with prehistoric animals', genre:'Animation,Comedy'},
      {id:3,title:'Harry Potter', description: 'Movie with wizards', genre: 'SF'}
    ]

    return {clients,movies};
  }
}
