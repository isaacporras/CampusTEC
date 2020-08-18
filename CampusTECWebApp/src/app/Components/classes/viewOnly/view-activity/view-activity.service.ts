
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

  


  getComments(id){
    let url = this.server + '/comment/' + id
    console.log(url)
    return this.http.get(url);

  }

  postComment(json){
    let url = this.server + '/comment/'
    console.log(url)
    console.log('Se va a comentar:' + JSON.stringify(json))
    return this.http.post(url,json);

  }
  getUserName(json){
    let url = this.server + '/comment/getName'
    console.log(url)
    console.log('Se va a obtener el nombre de:' + JSON.stringify(json))
    return this.http.post(url, json);
  }

  downloadFile(id){
    const pdfUrl = './assets/sample.pdf';
    const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, pdfName);
}
}
