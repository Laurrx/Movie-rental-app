import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  public url = '';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }

  save(entity: any): Observable<any> {

    return this.httpClient.post<any>(this.url, entity);
  }

  get(id: number): Observable<any | undefined> {
    return this.getAll().pipe(
      map((arr: any[]) => arr.find(c => c.id === id)));

  }

  update(entity: any): Observable<any> {
    const url = `${this.url}/${entity.id}`;
    return this.httpClient.put<any>(url, entity);
  }

  delete(id: number) {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete(url)
  }
}




