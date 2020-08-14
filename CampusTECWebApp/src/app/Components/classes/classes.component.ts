import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  objectives: any = [
    {
      id: '1', description: 'Evaluar la conveniencia en el uso de un cierto método en lan solución de un problema numérico específico.'
    },
    {
      id: '2', description: 'Implementar programas de cálculo relacionado con los tópicos estudiados independientemente del lenguaje y de la plataforma computacional disponible.'
    },
    {
      id: '3', description: 'Aplicar conceptos de distintos paradigmas de programación en la solución de problemas numéricos'
    }

  ];


  constructor() { }

  ngOnInit() {
  }

}
