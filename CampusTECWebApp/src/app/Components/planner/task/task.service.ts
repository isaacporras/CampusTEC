import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }
  server = 'http://localhost:8080/CampusTEC_API_war_exploded';

  getTaskInfo(id){

    return this.http.get(this.server + '/planner/assignment/' + id);

  }


  getActivities(token, week) {
    let json = {
      token: String(token),
      week: String(week)
    }

    console.log(json)
    return this.http.post(this.server + '/planner/activities', json)
  }

}
