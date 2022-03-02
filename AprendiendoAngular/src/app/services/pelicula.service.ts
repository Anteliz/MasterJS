import { Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()
export class PeliculaService{
    public peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula('Spiderman', 2021, '../assets/css/images/spiderman.jpg'),
            new Pelicula('Endgame', 2018, '../assets/css/images/endgame.jpg'),
            new Pelicula('Capitan America', 2012, '../assets/css/images/capitan.jpg'),
            new Pelicula('Thor', 2013, '../assets/css/images/thor.jpg')
          ];
    }
    holaMundo(){
        return 'Hola mundo desde el servicio de Angular';
    }

    getPeliculas(){
        return this.peliculas
    }
}