import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var require: any;
const FileSaver = require('file-saver');

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }

server = 'http://localhost:8080/CampusTEC_API_war_exploded/';

  getObjectives(id) {

    return this.http.get(this.server + 'classes/objectives/' +  id);
  }
  getComments(){
    return [
      {
        id: 1,
        description: 'diagrama de fluko mio',
        time: '3:45',
        date:'23/6/1999',
        user: 'Oscar Isaac',
        activityId: 2,
        fileURL: 'https://firebasestorage.googleapis.com/v0/b/campustec-12a23.appspot.com/o/activityImages%2Factivity_1aqsad2bty1?alt=media&token=f643ceb6-ff95-4caa-a09a-c942e27e5ed2'
      },
      {
        id: 1,
        description: 'No entiendo xd',
        time: '1:00',
        date:'24/1/2020',
        user: 'Kenneth Hernandez',
        activityId: 2,
        fileURL: 'https://firebasestorage.googleapis.com/v0/b/campustec-12a23.appspot.com/o/activityImages%2Factivity_1aqsad2bty1?alt=media&token=f643ceb6-ff95-4caa-a09a-c942e27e5ed2'
      },
    ]
  }

  downloadFile(id){
    const pdfUrl = './assets/sample.pdf';
    const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, pdfName);
}
}
