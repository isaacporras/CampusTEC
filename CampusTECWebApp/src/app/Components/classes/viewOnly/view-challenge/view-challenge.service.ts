
import { Injectable } from '@angular/core';
import { animationFrameScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewChallengeService {


  constructor() { }


  getChallengeInfo() {
    return {
      id: 1,
      name: 'Realizar ejercicio fisico durante toda la semana',
      date: '5/7/2021',
      payment: 300,
      objectives: [
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
      ],
      fileURL: 'https://firebasestorage.googleapis.com/v0/b/campustec-12a23.appspot.com/o/activityImages%2Factivity_1aqsad2bty1?alt=media&token=f643ceb6-ff95-4caa-a09a-c942e27e5ed2',
      
      activities:[
        {
          id: 67,
          description: 'Mejorar las herramientas para programar de cada uno de los estuiantes de la generacion numero',
        },
        {
          id: 90,
          description: 'Mejorar la salud mental de los estudiantes.',
        }
      ]
    }
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


  getStudents() {
    return [
      {
        id: 201710856,
        name: 'Marco',
        lastname: 'Herrera',
        status: true

      },
      {
        id: 2017111111,
        name: 'Kenneth',
        lastname: 'Hernandez',
        status: true

      },
      {
        id: 201777777,
        name: 'Jasson',
        lastname: 'Rodriguez',
        status: false

      }

    ]
  }

}
