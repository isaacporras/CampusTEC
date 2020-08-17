import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { 


  }
  server = 'http://localhost:8080/CampusTEC_API_war_exploded';


  getActivitiesAndChallenges(id){
    return this.http.get(this.server + '/classes/challenges/' + id);
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


}
