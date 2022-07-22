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

}
