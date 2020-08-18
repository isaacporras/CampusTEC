import { Injectable } from '@angular/core';
import { animationFrameScheduler } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  

  constructor(private http: HttpClient) { }

server = 'http://localhost:8080/CampusTEC_API_war_exploded/';

  getObjectives(id) {

    return this.http.get(this.server + 'classes/objectives/' +  id);
  }

  postChallenge(json){
    return this.http.post(this.server + 'classes/challenges/new',json);
  }


  getStudents(){
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
