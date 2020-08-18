
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var require: any;
const FileSaver = require('file-saver');


@Injectable({
  providedIn: 'root'
})
export class ViewActivityService {

  constructor(private http: HttpClient) {
  }

  server = 'http://localhost:8080/CampusTEC_API_war_exploded';

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
  getActivityInfo(id) {
    let url = this.server + '/activities/info/' + id
    console.log(url)
    return this.http.get(url);
  }


  getComments(){
    return [
      {
        id: 1,
        description: 'diagrama de fluko mio',
        time: '3:45',
        date: '23/6/1999',
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
  getUserName(id){
    return {
      id:1,
      user:'Pamela Jimenez'
    }
  }

  downloadFile(id){
    const pdfUrl = './assets/sample.pdf';
    const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, pdfName);
}
}
