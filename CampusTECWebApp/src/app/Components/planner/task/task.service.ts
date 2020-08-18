import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  getTaskInfo(id){
    return {
      name: 'Hacer actividad fisica',
      week : 1,
      activity: 'Ir al gym',
      day: 4,
      hour: 12,
      description: 'Ir al gym para sacar musculatura'
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

}
