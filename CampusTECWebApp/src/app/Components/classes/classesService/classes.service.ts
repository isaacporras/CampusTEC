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



  getActivities(id) {
    return this.http.get(this.server + '/classes/activities/' + id);
  }

  getObjectives(id) {

    return this.http.get(this.server + '/classes/objectives/' + id);
  }


}
