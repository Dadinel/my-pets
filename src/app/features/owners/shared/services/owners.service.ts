import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from './../interfaces/owner.interface';

const URL = 'http://localhost:3000/owners';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(): Observable<Array<Owner>> {
    return this.httpClient.get<Array<Owner>>(URL);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${URL}/${id}`);
    // http://localhost:3000/owners/1
  }

  post(body: Owner): Observable<Owner> {
    return this.httpClient.post<Owner>(URL, body);
  }

  put(body: Owner): Observable<Owner> {
    return this.httpClient.put<Owner>(`${URL}/${body.id}`, body);
  }
}
