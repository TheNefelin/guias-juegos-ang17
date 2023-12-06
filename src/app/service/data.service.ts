import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego } from '../interfaces/juego';
import { JuegoDeta } from '../interfaces/juego-deta';
import { JuegoBackground } from '../interfaces/juego-background';
import { JuegoGuiaFuente } from '../interfaces/juego-guia-fuente';
import { JuegoGuiaPersonaje } from '../interfaces/juego-guia-personaje';
import { JuegoGuia } from '../interfaces/juego-guia';
import { JuegoGuiaAventura } from '../interfaces/juego-guia-aventura';
import { JuegoGuiaAventuraImg } from '../interfaces/juego-guia-aventura-img';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  #apiUrl = "https://bsite.net/metalflap";

  constructor(private http: HttpClient) {}

  getGame_All(): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.#apiUrl}/gj_juegos`);
  }

  getGame_ById(id: number): Observable<JuegoDeta[]> {
    return this.http.get<JuegoDeta[]>(`${this.#apiUrl}/gj_juegos/${id}`);
  }

  getGame_Background_ByIdGame(id: number): Observable<JuegoBackground[]> {
    return this.http.get<JuegoBackground[]>(`${this.#apiUrl}/gj_background_img/${id}`)
  }

  getGame_Guia_Fuente_ByIdGame(id: number): Observable<JuegoGuiaFuente[]> {
    return this.http.get<JuegoGuiaFuente[]>(`${this.#apiUrl}/gj_fuentes/${id}`)
  }

  getGame_Guia_Personaje_ByIdGame(id: number): Observable<JuegoGuiaPersonaje[]> {
    return this.http.get<JuegoGuiaPersonaje[]>(`${this.#apiUrl}/gj_personajes/${id}`)
  }

  // getAllGame_Guia(): Observable<JuegoGuia[]> {
  //   return this.http.get<JuegoGuia[]>(this.#apiUrl + "/gj_background_img")
  // }

  // getAllGame_Guia_Aventura(): Observable<JuegoGuiaAventura[]> {
  //   return this.http.get<JuegoGuiaAventura[]>(this.#apiUrl + "/gj_aventuras")
  // }

  // getAllGame_Guia_Aventura_Img(): Observable<JuegoGuiaAventuraImg[]> {
  //   return this.http.get<JuegoGuiaAventuraImg[]>(this.#apiUrl + "/gj_aventuras_img")
  // }

}
