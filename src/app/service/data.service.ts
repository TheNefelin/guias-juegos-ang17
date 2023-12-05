import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego } from '../interfaces/juego';
import { JuegoBackground } from '../interfaces/juego-background';
import { JuegoGuia } from '../interfaces/juego-guia';
import { JuegoGuiaFuente } from '../interfaces/juego-guia-fuente';
import { JuegoGuiaPersonaje } from '../interfaces/juego-guia-personaje';
import { JuegoGuiaAventura } from '../interfaces/juego-guia-aventura';
import { JuegoGuiaAventuraImg } from '../interfaces/juego-guia-aventura-img';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  #apiUrl = "https://bsite.net/metalflap";
  
  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.#apiUrl + "/gj_juegos");
  }

  getAllGame_Background(): Observable<JuegoBackground[]> {
    return this.http.get<JuegoBackground[]>(this.#apiUrl + "/gj_background_img")
  }

  getAllGame_Guia(): Observable<JuegoGuia[]> {
    return this.http.get<JuegoGuia[]>(this.#apiUrl + "/gj_background_img")
  }

  getAllGame_Guia_Fuente(): Observable<JuegoGuiaFuente[]> {
    return this.http.get<JuegoGuiaFuente[]>(this.#apiUrl + "/gj_fuentes")
  }

  getAllGame_Guia_Personaje(): Observable<JuegoGuiaPersonaje[]> {
    return this.http.get<JuegoGuiaPersonaje[]>(this.#apiUrl + "/gj_personajes")
  }

  getAllGame_Guia_Aventura(): Observable<JuegoGuiaAventura[]> {
    return this.http.get<JuegoGuiaAventura[]>(this.#apiUrl + "/gj_aventuras")
  }

  getAllGame_Guia_Aventura_Img(): Observable<JuegoGuiaAventuraImg[]> {
    return this.http.get<JuegoGuiaAventuraImg[]>(this.#apiUrl + "/gj_aventuras_img")
  }
}
