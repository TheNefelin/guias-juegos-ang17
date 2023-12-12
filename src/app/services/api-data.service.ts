import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Juego } from '../interfaces/juego';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject, map, share, shareReplay } from 'rxjs';
import { JuegoDeta } from '../interfaces/juego-deta';
import { JuegoBackground } from '../interfaces/juego-background';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private apiUrl = environment.API_URL
  private juego$ = new Subject<Juego[]>().asObservable()
  private juego_background$ = new Subject<JuegoBackground[]>().asObservable()

  constructor(private httpClient: HttpClient) {
    this.juego$ = this.httpClient.get<Juego[]>(`${this.apiUrl}/gj_juegos`).pipe(shareReplay(1))
    this.juego_background$ = this.httpClient.get<JuegoBackground[]>(`${this.apiUrl}/gj_background_img`).pipe(shareReplay(1))
  }

  getJuegos(): Observable<Juego[]> {
    return this.juego$
  }

  getJuegos_ById(id: number): Observable<Juego[]> {
    return this.juego$.pipe(map(juegos => juegos.filter(juego => juego.id === id)))
  }

  getJuegoBackground_ById(id: number): Observable<JuegoBackground[]> {
    return this.juego_background$.pipe(map(backgrounds => backgrounds.filter(background => background.id_juego === id)))
  }

}
