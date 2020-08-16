import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class HttpServicesService {

  constructor(private http: HttpClient) {
  }

  server = "http://localhost:8080";

  getUserDetails() {
    //post these details to API server to return user info is correct
  }

  getTareas(semana: number) {
    return this.http.get(this.server + "/CampusTEC_API_war_exploded/login");
  }
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
  getClasses(){
    return [1, 2, 3]
  }

  

  autenticate(credentials: JSON) {
    console.log(this.server + "/CampusTEC_API_war_exploded/login")
    return this.http.post(this.server + "/CampusTEC_API_war_exploded/login", credentials)
  }

}
