import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public user: any;
  public campo: string;
  constructor() {
    this.user = {
      nombre: '',
      apellidos: '',
      bio: '',
      genero: ''
    };
    this.campo = "";
  }

  ngOnInit(): void {
  }

  onSubmit(){
    alert("Información Guardada");
    console.log(this.user);
  }

  hasDadoClick(){
    alert("Haz dado Click");
  }

  hasSalido(){
    alert("Haz salido");
  }

  hasDadoEnter(){
    alert("Haz dado enter");
  }
}
