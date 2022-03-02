import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'], 
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: String
  public peliculas: Pelicula[];
  public favorita:Pelicula;
  public fecha: any;

  constructor(
    private _peluiculaService: PeliculaService
  ) {
    this.titulo = "Componente películas";
    this.peliculas = this._peluiculaService.getPeliculas();
    this.favorita = new Pelicula('', 0, '');
    this.fecha = new Date(2022, 0o2, 0o1)
  }

  ngOnInit(): void {
    console.log(this.peliculas);
    console.log(this._peluiculaService.holaMundo());
  }

  ngDoCheck(): void {
    console.log("Docheck Lanzado");
  }

  CambiarTitulo() {
    this.titulo = "Se cambio el título";
  }

  ngOnDestroy(): void {
    console.log("El componente se eliminará de la ejecución ");
  }

  mostrarFavorita(event: any){
    this.favorita = event.pelicula
  }
}
