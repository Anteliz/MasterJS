import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: String

  constructor() { 
    this.titulo = "Componente películas";
    console.log("Constructor lanzado");
  }

  ngOnInit(): void {
    console.log("Componente iniciado");
  }

  ngDoCheck(): void {
      console.log("Docheck Lanzado");
  }

  CambiarTitulo(){
    this.titulo = "Se cambio el título";
  }

  ngOnDestroy(): void {
      console.log("El componente se eliminará de la ejecución ");
  }

}
