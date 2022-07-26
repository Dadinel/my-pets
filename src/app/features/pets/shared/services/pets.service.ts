import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet.interface';

const URL: string = 'http://localhost:3000/pets';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Array<Pet>> {
    return this.http.get<Array<Pet>>(URL);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  put(body: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${URL}/${body.id}`, body);
  }

  post(body: Pet): Observable<Pet> {
    return this.http.post<Pet>(URL, body);
  }
}
