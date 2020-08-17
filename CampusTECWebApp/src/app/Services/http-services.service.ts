import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class HttpServicesService {

  constructor(private http: HttpClient) {
  }

  server = 'http://localhost:8080/CampusTEC_API_war_exploded';


  getUserDetails() {
    //post these details to API server to return user info is correct
  }

  getAssignments(semana: number) {
    return this.http.get(this.server + '/CampusTEC_API_war_exploded/login');
  }

  getChallenges() {
    return [{
      name: 'Cálculo',
      children: [
        {
          name: 'Ir a todas las tutorias',
          id: 1,
          children: [
            {name: 'Hacer tutoria 1', id: 1, newComments: false},
            {name: 'Hacer tutoria 2', id: 2, newComments: false},
            {name: 'Hacer tutoria 3', id: 3, newComments: true},
          ]
        }, {
          name: 'Completar todas las asignaciones',
          id: 2,
          children: [
            {name: 'Hacer tarea 1', id: 4, newComments: false},
            {name: 'Hacer tarea 2', id: 5, newComments: true},
            {name: 'Hacer tarea 3', id: 6, newComments: false},
          ]
        },
        {
          name: 'Hacer ejercicio todos los dias',
          id: 3,
          children: [
            {name: 'Hacer ejercicio el lunes', id: 7, newComments: true},
            {name: 'Hacer ejercicio el lunes', id: 8, newComments: false},
            {name: 'Hacer ejercicio el lunes', id: 9, newComments: false},
          ]
        }
      ]
    },
      {
        name: 'Fisica',
        children: [
          {
            name: 'Ir a todas las tutorias',
            id: 1,
            children: [
              {name: 'Hacer tutoria 1', id: 1, newComments: false},
              {name: 'Hacer tutoria 2', id: 2, newComments: false},
              {name: 'Hacer tutoria 3', id: 3, newComments: false},
            ]
          }, {
            name: 'Completar todas las asignaciones',
            id: 2,
            children: [
              {name: 'Hacer tarea 1', id: 4, newComments: false},
              {name: 'Hacer tarea 2', id: 5, newComments: true},
              {name: 'Hacer tarea 3', id: 6, newComments: false},
            ]
          },
          {
            name: 'Hacer ejercicio todos los dias',
            id: 3,
            children: [
              {name: 'Hacer ejercicio el lunes', id: 7, newComments: false},
              {name: 'Hacer ejercicio el lunes', id: 8, newComments: false},
              {name: 'Hacer ejercicio el lunes', id: 9, newComments: false},
            ]
          }
        ]
      }];
  }
  postUpdateProfile(json){
    let url = this.server + '/profile/edit';
    console.log(url);
    return this.http.post(url,json)
  }

  getActivitiesTask() {
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

  getActivities() {
    return [{
      name: 'Señales',
      activities: [
        {
          id: '1', name: 'Hacer tutoria 1', newComments: false
        },
        {
          id: '2', name: 'Hacer tutoria 2', newComments: false
        },
        {
          id: '3', name: 'Hacer tutoria 3', newComments: true
        },
        {
          id: '4', name: 'Hacer tutoria 4', newComments: false
        },
      ]
    },
      {
        name: 'Especificacion',
        activities: [
          {
            id: '1', name: 'Hacer tutoria 1', newComments: false
          },
          {
            id: '2', name: 'Hacer tutoria 2', newComments: true
          },
          {
            id: '3', name: 'Hacer tutoria 3', newComments: false
          },
          {
            id: '4', name: 'Hacer tutoria 4', newComments: false
          },
        ]
      }
    ];
  }

  authenticate(credentials: JSON) {
    return this.http.post(this.server + '/login', credentials);
  }

  getProfile(token: string){
    let url =this.server + '/profile/';
    console.log('El url es:')
    console.log(url);
    let json = {
      token: token
    }
    return this.http.post(this.server + '/profile/', json);
  }

}
