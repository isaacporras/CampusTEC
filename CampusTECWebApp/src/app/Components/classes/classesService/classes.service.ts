import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor() { }



  getActivitiesAndChallenges(){
    return [
      {
        name: 'Ir a todas las tutorias',
        id: 1,
        children: [
          { name: 'Hacer tutoria 1', id: 1 },
          { name: 'Hacer tutoria 2', id: 2 },
          { name: 'Hacer tutoria 3', id: 3 },
        ]
      }, {
        name: 'Completar todas las asignaciones',
        id: 2,
        children: [
          { name: 'Hacer tarea 1', id: 4 },
          { name: 'Hacer tarea 2', id: 5 },
          { name: 'Hacer tarea 3', id: 6 },
        ]
      },
      {
        name: 'Hacer ejercicio todos los dias',
        id: 3,
        children: [
          { name: 'Hacer ejercicio el lunes', id: 7 },
          { name: 'Hacer ejercicio el lunes', id: 8 },
          { name: 'Hacer ejercicio el lunes', id: 9 },
        ]
      }
    ];
  }

  getClassBaseData() {
    return {
      id: 11,
      name: 'Analisis Numerico para ingeniería',
      group: 5
    };
  }




  getActivities() {
    return [
      {
        id: '1', name: 'Hacer tutoria 1'
      },
      {
        id: '2', name: 'Hacer tutoria 2'
      },

      {
        id: '3', name: 'Hacer tutoria 3'
      },
      {
        id: '4', name: 'Hacer tutoria 4'
      },
    ];
  }

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

  getActivitiesAndChallengesNested(){
    return [
      {
        name: 'R-1',
        children: [
          { name: 'A-1' },
          { name: 'A-2' },
          { name: 'A-3' },
        ]
      }, {
        name: 'R-2',
        children: [
          { name: 'A-4' },
          { name: 'A-5' },
          { name: 'A-6' },
        ]
      },
      {
        name: 'R-3',
        children: [
          { name: 'A-7' },
          { name: 'A-8' },
          { name: 'A-9' },
        ]
      }
    ];
  }

}
