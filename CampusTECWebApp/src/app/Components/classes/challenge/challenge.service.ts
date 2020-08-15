import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  

  constructor() { }



  getObjectives() {

    return [
      {
        id: '1', description: 'Evaluar la conveniencia en el uso de un cierto método en lan solución de un problema numérico específico.'
      },
      {
        id: '2',
        description: 'Implementar programas de cálculo relacionado con los tópicos estudiados independientemente del lenguaje y de la plataforma computacional disponible.'
      },
      {
        id: '3', description: 'Aplicar conceptos de distintos paradigmas de programación en la solución de problemas numéricos'
      },
      {
        id: '4', description: 'Mejorar las habilidades matematicas de los estudiantes.'
      }

    ];
  }


  getStudents(){
    return [
      {
        id: 201710856,
        name: 'Marco',
        lastname: 'Herrera',

      },
      {
        id: 2017111111,
        name: 'Kenneth',
        lastname: 'Hernandez',

      },
      {
        id: 201777777,
        name: 'Jasson',
        lastname: 'Rodriguez',

      }

    ]
  }

}
