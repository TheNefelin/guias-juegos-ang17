import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Juego } from '../interfaces/juego';
import { environment } from '../../environments/environment';
import { Observable, Subject, map, shareReplay } from 'rxjs';
import { JuegoBackground } from '../interfaces/juego-background';
import { JuegoGuiaFuente } from '../interfaces/juego-guia-fuente';
import { JuegoGuiaPersonaje } from '../interfaces/juego-guia-personaje';
import { JuegoGuia } from '../interfaces/juego-guia';
import { JuegoGuiaAventura } from '../interfaces/juego-guia-aventura';
import { JuegoGuiaAventuraImg } from '../interfaces/juego-guia-aventura-img';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private apiUrl = environment.API_URL

  private juego$ = new Subject<Juego[]>().asObservable()
  private juego_background$ = new Subject<JuegoBackground[]>().asObservable()
  private Juego_fuente$ = new Subject<JuegoGuiaFuente[]>().asObservable()
  private Juego_character$ = new Subject<JuegoGuiaPersonaje[]>().asObservable()
  private juego_guia$ = new Subject<JuegoGuia[]>().asObservable()

  constructor(private httpClient: HttpClient) {
    this.juego$ = this.httpClient.get<Juego[]>(`${this.apiUrl}/gj_juegos`).pipe(shareReplay(1))
    this.juego_background$ = this.httpClient.get<JuegoBackground[]>(`${this.apiUrl}/gj_background_img`).pipe(shareReplay(1))
    this.Juego_fuente$ = this.httpClient.get<JuegoGuiaFuente[]>(`${this.apiUrl}/gj_fuentes`).pipe(shareReplay(1))
    this.Juego_character$ = this.httpClient.get<JuegoGuiaPersonaje[]>(`${this.apiUrl}/gj_personajes`).pipe(shareReplay(1))
  }

  getJuegos(): Observable<Juego[]> {
    console.log(`-- getJuegos_ById --`)    
    return this.juego$
  }

  getJuegos_ById(id: number): Observable<Juego[]> {
    console.log(`-- getJuegos_ById -- (${id})`)
    return this.juego$.pipe(map(juegos => juegos.filter(juego => juego.id === id)))
  }

  getJuegoBackground_ById(id_juego: number): Observable<JuegoBackground[]> {
    console.log(`-- getJuegoBackground_ById -- (${id_juego})`)
    return this.juego_background$.pipe(map(backgrounds => backgrounds.filter(background => background.id_juego === id_juego)))
  }

  getJuegoFuente_ById(id_juego: number): Observable<JuegoGuiaFuente[]> {
    console.log(`-- getJuegoFuente_ById -- (${id_juego})`)
    return this.Juego_fuente$.pipe(map(fuentes => fuentes.filter(fuente => fuente.id_juego === id_juego)))
  }

  getJuegoCharacter_ById(id_juego: number): Observable<JuegoGuiaPersonaje[]> {
    console.log(`-- getJuegoCharacter_ById -- (${id_juego})`)
    return this.Juego_character$.pipe(map(personajes => personajes.filter(personaje => personaje.id_juego === id_juego)))
  }

  getJuegoGuide_ById(id_juego: number, user: string): Observable<JuegoGuia[]> {
    console.log(`-- getJuegoGuide_ById -- (${id_juego})`)
    this.juego_guia$ = this.httpClient.get<JuegoGuia[]>(`${this.apiUrl}/gj_guias?user=${user}`)
    return this.juego_guia$.pipe(map(guias => guias.filter(guia => guia.id_juego === id_juego)))
  } 
  
  getJuegoAdventure_ById(id_juego: number, user: string): Observable<JuegoGuiaAventura[]> {
    console.log(`-- getJuegoAdventure_ById -- (${id_juego})`)
    return this.httpClient.get<JuegoGuiaAventura[]>(`${this.apiUrl}/gj_aventuras/${id_juego}?user=${user}`)
  } 

  getJuegoAdventureImg_ById(id_juego: number): Observable<JuegoGuiaAventuraImg[]> {
    console.log(`-- getJuegoAdventureImg_ById -- (${id_juego})`)
    return this.httpClient.get<JuegoGuiaAventuraImg[]>(`${this.apiUrl}/gj_aventuras_img/${id_juego}`)
  } 
  
}
